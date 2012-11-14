module Rubyfox
  module Server
    class Environment
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
