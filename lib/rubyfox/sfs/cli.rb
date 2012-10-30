require 'thor'

require 'rubyfox/sfs'

module Rubyfox
  module SFS
    class CLI < Thor
      include Thor::Actions

      desc "install DIR", "install SmartFox Server into DIR"
      def install(dir)
        if File.exist?(dir)
          abort "Directory #{dir} already exists!"
        end

        directory Rubyfox::SFS.data_dir, dir
      end
    end

    CLI.source_root Rubyfox::SFS.data_dir
  end
end
