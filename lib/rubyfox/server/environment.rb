module Rubyfox
  module Server
    class Environment
      def initialize(env, asker)
        @env    = env
        @asker  = asker
        @local  = {}
      end

      def [](name)
        name = name.to_s
        value = @local[name] || @env[name]
        value || begin
          msg = "Specify env #{name}:"
          loop do
            answer = @asker.ask(msg)
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
