require 'spec_helper'

require 'rubyfox/server/environment'

class FakeEnvironment < Rubyfox::Server::Environment
  attr_reader :answers, :asked

  def initialize(*)
    super
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
  let(:environment) { FakeEnvironment.new(env) }

  context "[]" do
    it "returns predefined value" do
      env["foo"] = 23
      assert_equal 23, environment["foo"]
    end

    it "asks for missing value" do
      environment.answers << "23"

      assert_equal "23", environment["foo"]
      assert_equal "23", environment["foo"]

      assert_asked "foo", 1
    end

    it "keep asking for empty values" do
      environment.answers << ""
      environment.answers << "23"

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

    assert_equal expected, environment.asked
  end

end
