require 'spec_helper'

require 'rubyfox/server/environment'

describe Rubyfox::Server::Environment do
  let(:env) { Hash.new }
  let(:environment) { Rubyfox::Server::Environment.new(env) }

  context "[]" do
    it "returns predefined value" do
      env["foo"] = 23
      assert_equal 23, environment["foo"]
    end

    it "asks for missing value" do
      with_stdin do |stdin|
        stdin << "23\n"
        assert_output "Specify env foo: " do
          assert_equal "23", environment["foo"]
        end
      end

      assert_equal "23", environment["foo"]
    end

    it "keep asking for empty values" do
      with_stdin do |stdin|
        expected_output = (["Specify env foo: "] * 2).join
        assert_output expected_output do
          stdin << "\n"
          stdin << "23\n"
          assert_equal "23", environment["foo"]
        end
      end
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

  def with_stdin
    line_editor = Thor::LineEditor
    old_method = line_editor.method(:readline)
    stdin = []
    line_editor.define_singleton_method(:readline) do |message, *|
      $stdout.print message
      stdin.shift or fail "no input left"
    end
    yield stdin
  ensure
    line_editor.define_singleton_method(:readline) do |*args|
      old_method.call(*args)
    end
  end

end
