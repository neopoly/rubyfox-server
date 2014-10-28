# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'rubyfox/server/version'

Gem::Specification.new do |gem|
  gem.name          = "rubyfox-server"
  gem.version       = Rubyfox::Server::VERSION
  gem.authors       = ["Peter Suschlik"]
  gem.email         = ["ps@neopoly.de"]
  gem.description   = %q{SmartFox Server bundled as a gem}
  gem.summary       = %q{}
  gem.homepage      = "https://github.com/neopoly/rubyfox-server"
  gem.licenses      = ['MIT']

  gem.files         = `git ls-files`.split($/)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ["lib"]

  gem.add_runtime_dependency 'thor'
  gem.add_runtime_dependency 'mime-types'

  gem.add_development_dependency 'minitest', '~> 5.4.2'
end
