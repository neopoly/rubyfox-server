require 'spec_helper'

require 'rubyfox/server/environment'

class TestAsker
  attr_reader :answers, :asked

  def initialize
    @asked = []
    @answers = []
  end

  def ask(message)
    @asked << message
    @answers.shift or fail "no answers left"
  end
end

describe Rubyfox::Server::Environment do
  let(:env) { Hash.new }
  let(:asker) { TestAsker.new }
  let(:environment) { Rubyfox::Server::Environment.new(env, asker) }

  context "[]" do
    it "returns predefined value" do
      env["foo"] = 23
      assert_equal 23, environment["foo"]
    end

    it "asks for missing value" do
      asker.answers << "23"

      assert_equal "23", environment["foo"]
      assert_equal "23", environment["foo"]

      assert_asked "foo", 1
    end

    it "keep asking for empty values" do
      asker.answers << ""
      asker.answers << "23"

      assert_equal "23", environment["foo"]
      assert_asked "foo", 2
    end
  end

  context "[]=" do
    it "sets env" do
      environment["foo"] = 23

      assert_equal 23, environment["foo"]
    end

    it "stringifies when setting env" do
      environment[:foo] = 23

      assert_equal 23, environment["foo"]
      assert_equal 23, environment[:foo]
    end
  end

  private

  def assert_asked(key, amount=1)
    expected = ["Specify env #{key}:"] * amount

    assert_equal expected, asker.asked
  end

end
