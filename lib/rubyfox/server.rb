require 'pathname'

module Rubyfox
  module Server
    def self.data_dir
      Pathname.new(File.dirname(__FILE__)).join("server").join("data")
    end
  end
end
