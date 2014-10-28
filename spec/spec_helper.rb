require 'minitest/autorun'

Minitest::Spec.class_eval do
  class << self
    alias :context :describe
  end
end
