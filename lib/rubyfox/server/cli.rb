require "thor"
require "mime/types"

require "rubyfox/server"
require "rubyfox/server/version"
require "rubyfox/server/environment"

module Rubyfox
  module Server
    class CLI < Thor
      include Thor::Actions

      def self.source_root
        Rubyfox::Server.data_dir
      end

      desc "install TARGET_DIR", "Install SmartFox Server into TARGET_DIR"

      def install(target_dir)
        if File.exist?(target_dir)
          abort "Directory #{target_dir} already exists!"
        end

        directory self.class.source_root, target_dir
      end

      desc "configure TARGET_DIR TEMPLATE_DIR", "Configure SmartFox Server in TARGET_DIR via TEMPLATE_DIR"

      def configure(target_dir, template_dir)
        template_dir = File.expand_path(template_dir, Dir.pwd)
        target_dir = File.expand_path(target_dir, Dir.pwd)

        verify_version(template_dir)

        Dir["#{template_dir}/**/*"].each do |file|
          if File.file?(file)
            part = file.partition(template_dir).last
            target_file = "#{target_dir}/#{part}"
            if file_plain?(file)
              template file, target_file
            else
              copy_file file, target_file
            end
          end
        end
      rescue WrongVersionError => e
        STDERR.puts e.message
      end

      map "config" => :configure

      desc "start TARGET_DIR", "Start SmartFox Server in TARGET_DIR"

      def start(target_dir)
        ['INT', 'TERM'].each do |signal|
          trap signal do
            throw :shutdown_signal
          end
        end

        inside(target_dir) do
          catch :shutdown_signal do
            system "sh ./sfs2x.sh"
          end
        end
      end

      desc "version", "Display version of this command"

      def version
        puts Rubyfox::Server::VERSION
      end

      no_tasks do
        def env
          @env ||= Environment.new(ENV, self)
        end
      end

      private

      def file_plain?(file)
        types = MIME::Types.type_for(file)
        types.empty? || types.any? { |type| type.media_type == "text" }
      end

      def verify_version(template_dir)
        filename = "#{template_dir}/version"
        if File.exist?(filename)
          expected_version = File.read(filename)
          version = Rubyfox::Server::VERSION

          unless satisfied_version?(expected_version, version)
            msg = query = <<~MSG.chomp
              Configuration failed!

              Your rubyfox-server version: #{version}
              Needed version: ~>#{expected_version}
            MSG
            raise WrongVersionError.new(msg)
          end
        end
      end

      def satisfied_version?(expected_version, version)
        requirement = Gem::Requirement.new("~> #{expected_version}")
        requirement.satisfied_by?(Gem::Version.create(version))
      end

      class WrongVersionError < RuntimeError; end
    end
  end
end
