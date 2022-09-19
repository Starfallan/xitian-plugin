import base from "./base.js";
import ConfigSet from "./ConfigSet.js";
import cfg from "../../../lib/config/config.js";

export default class Help extends base {
  constructor(e) {
    super(e);
    this.model = "help";
  }

  static async get(e) {
    let html = new Help(e);
    return await html.getData();
  }

  async getData() {
    let helpData = ConfigSet.getdefSet("help", "set");

    let groupCfg = cfg.getGroup(this.group_id);

    if (groupCfg.disable && groupCfg.disable.length) {
      helpData.map((item) => {
        if (groupCfg.disable.includes(item.group)) {
          item.disable = true;
        }
        return item;
      });
    }

    let versionData = ConfigSet.getdefSet("version", "set");

    const version =
      (versionData && versionData.length && versionData[0].version) || "1.0.0";


    return {
      ...this.screenData,
      saveId: "help",
      version: version,
      helpData,
    };
    
  }
}
