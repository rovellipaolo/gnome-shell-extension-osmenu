
build:
	gnome-extensions pack --extra-source=icon.svg --force

build-settings:
	glib-compile-schemas schemas/

checkstyle:
	eslint .

install:
	gnome-extensions install osmenu@rovellipaolo-gmail.com.shell-extension.zip --force
	echo "Remember to restart GNOME Shell: press 'Alt'+'F2', type 'r' and press enter."

install-checkstyle:
	npm install -g eslint@5.7

disable:
	gnome-extensions disable osmenu@rovellipaolo-gmail.com

enable:
	gnome-extensions enable osmenu@rovellipaolo-gmail.com

show-logs:
	journalctl /usr/bin/gnome-shell -f -o cat
