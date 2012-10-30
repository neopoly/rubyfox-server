# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'rubyfox/sfs/version'

Gem::Specification.new do |gem|
  gem.name          = "rubyfox-sfs"
  gem.version       = Rubyfox::SFS::VERSION
  gem.authors       = ["Peter Suschlik"]
  gem.email         = ["ps@neopoly.de"]
  gem.description   = %q{SmartFox Server bundled as a gem}
  gem.summary       = %q{}
  gem.homepage      = "https://github.com/neopoly/rubyfox-sfs"

  gem.files         = `git ls-files`.split($/)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ["lib"]
end
