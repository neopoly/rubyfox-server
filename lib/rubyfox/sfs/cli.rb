require 'thor'

require 'rubyfox/sfs'

module Rubyfox
  module SFS
    class CLI < Thor
      include Thor::Actions

      def self.source_root
        Rubyfox::SFS.data_dir
      end

      desc "install DIR", "install SmartFox Server into DIR"
      def install(dir)
        if File.exist?(dir)
          abort "Directory #{dir} already exists!"
        end

        directory self.class.source_root, dir
      end
    end
  end
end
