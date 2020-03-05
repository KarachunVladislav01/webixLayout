webix.protoUI(
  {
    name: "stateButton",
    $cssName: "stateButton",
    defaults: {
      state: 0
    },
    $init: function(config) {
      let state = config.state;
      const states = config.states;
      const length = Object.keys(config.states).length;
      let value = states[state];
      config.label = value;
      webix.html.addCss(this.$view, `state--${value.toLowerCase()}`);

      this.attachEvent("onItemClick", function() {
        this.callEvent("onStateChange", [value]);
        webix.html.removeCss(this.$view, `state--${value.toLowerCase()}`);
        state = state < length - 1 ? state + 1 : 0;
        value = states[state];
        this.config.state = state;
        this.config.label = value;
        webix.html.addCss(this.$view, `state--${value.toLowerCase()}`);
        this.refresh();
      });
    }
  },
  webix.ui.button
);
