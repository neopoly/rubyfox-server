require 'thor'

require 'rubyfox/sfs'

module Rubyfox
  module SFS
    class CLI < Thor
      include Thor::Actions

      def self.source_root
        Rubyfox::SFS.data_dir
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
        Dir[template_dir + "**/*"].each do |template_file|
          if File.file?(template_file)
            part = template_file.partition(template_dir).last
            template template_file, target_dir + "/" + part
          end
        end
      end
      map "config" => :configure

      no_tasks do
        def env
          @env ||= Env.new(ENV)
        end
      end

      class Env
        include Thor::Shell

        def initialize(env)
          @env = env
          @local = {}
        end

        def [](name)
          name = name.to_s
          value = @local[name] || @env[name]
          value || begin
            msg = "Specify env #{name}:"
            loop do
              answer = ask(msg)
              unless answer.empty?
                self[name] = answer
                break answer
              end
            end
          end
        end

        def []=(name, value)
          @local[name.to_s] = value
        end
      end
    end
  end
end
