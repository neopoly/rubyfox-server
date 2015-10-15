# Rubyfox server

SmartFox Server bundled as a gem.

[Gem](https://rubygems.org/gems/rubyfox-server) |
[Source](https://github.com/neopoly/rubyfox-server) |
[Documentation](http://www.rubydoc.info/gems/rubyfox-server)

See http://www.smartfoxserver.com

## Installation

    gem install rubyfox-server

## Usage

    smartfox install /path/to/smartfox

    smartfox configure /path/to/smartfox /path/to/template/dir

    smartfox start /path/to/smartfox

## Help

    Commands:
      smartfox configure TARGET_DIR TEMPLATE_DIR  # Configure SmartFox Server in TARGET_DIR via TEMPLATE_DIR
      smartfox help [COMMAND]                     # Describe available commands or one specific command
      smartfox install TARGET_DIR                 # Install SmartFox Server into TARGET_DIR
      smartfox start TARGET_DIR                   # Start SmartFox Server in TARGET_DIR
      smartfox version                            # Display version of this command

## Version

The version of this gem is tied to the real version of SmartFox Server.

Example: Gem version 2.3.0.x contains SmartFox Server version 2.3.0.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Release

1. Edit version.rb
2. git commit -m "Release X.Y.Z.P"
2. rake release
3. git push
