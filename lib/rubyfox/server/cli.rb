require 'thor'
require 'mime/types'

require 'rubyfox/server'
require 'rubyfox/server/environment'

module Rubyfox
  module Server
    class CLI < Thor
      include Thor::Actions

      def self.source_root
        Rubyfox::Server.data_dir
      end

      desc "install TARGET_DIR", "install SmartFox Server into TARGET_DIR"
      def install(target_dir)
        if File.exist?(target_dir)
          abort "Directory #{target_dir} already exists!"
        end

        directory self.class.source_root, target_dir
      end

      desc "configure TARGET_DIR TEMPLATE_DIR", "configures SmartFox Server in TARGET_DIR via TEMPLATE_DIR"
      def configure(target_dir, template_dir)
        template_dir = File.expand_path(template_dir, Dir.pwd)
        target_dir = File.expand_path(target_dir, Dir.pwd)

        Dir["#{template_dir}/**/*"].each do |file|
          if File.file?(file)
            part = file.partition(template_dir).last
            target_file = "#{target_dir}/#{part}"
            binary = MIME::Types.type_for(file).any?(&:binary?)
            if binary
              copy_file file, target_file
            else
              template file, target_file
            end
          end
        end
      end
      map "config" => :configure

      desc "start TARGET_DIR", "start SmartFox Server in TARGET_DIR"
      def start(target_dir)
        inside(target_dir) do
          system "sh ./sfs2x.sh"
        end
      end

      no_tasks do
        def env
          @env ||= Environment.new(ENV)
        end
      end
    end
  end
end