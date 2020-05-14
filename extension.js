"use strict";

const { Gio, GLib, GObject, St } = imports.gi;
const Main = imports.ui.main;
const Me = imports.misc.extensionUtils.getCurrentExtension();
const PanelMenu = imports.ui.panelMenu;
const Util = imports.misc.util;


let _menu;


/* exported MenuView */
var MenuView = GObject.registerClass(
    class MenuView extends PanelMenu.Button {
        _init() {
            super._init(0.0);
            this.addIcon();
            this.addOnClickEvent();
        }

        addIcon() {
            const icon = new St.Icon({
                gicon: Gio.icon_new_for_string(`${Me.path}/icon.svg`),
                icon_size: 14
            });
            this.actor.add_actor(icon);
        }

        addOnClickEvent() {
            this.actor.connect("button_press_event", () => {
                // Open "About" page:
                Util.spawn(['gnome-control-center', 'info-overview']);
                // Open terminal and execute "neofetch":
                // const defaultShell = GLib.getenv("SHELL");
                // const command = `gnome-terminal -- ${defaultShell} -c "neofetch; exec ${defaultShell}"`;
                // GLib.spawn_command_line_async(command);
            });
        }

        destroy() {
            super.destroy();
        }
    }
);

/** Triggered when the extension is initialized. */
/* exported init */
var init = () => {
    // Nothing to do...
};

/** Triggered when the extension is enabled. */
/* exported enable */
var enable = () => {
    _menu = new MenuView();
    Main.panel.addToStatusArea("os-menu", _menu, 0, "left");
};

/** Triggered when the extension is disabled. */
/* exported disable */
var disable = () => {
    _menu.destroy();
};
