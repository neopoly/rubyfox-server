require 'pathname'

module Rubyfox
  module SFS
    def self.data_dir
      Pathname.new(File.dirname(__FILE__)).join("sfs").join("data")
    end
  end
end
