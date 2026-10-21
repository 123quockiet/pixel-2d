const fs = require('fs');

const ent = fs.readFileSync('assets/entities.json', 'utf8');
const wor = fs.readFileSync('assets/world.json', 'utf8');
const vfx = fs.readFileSync('assets/ui_vfx.json', 'utf8');
const npc = fs.readFileSync('assets/npc.json', 'utf8');

const html = `<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js"></script>
</head>
<body>
  <div id="game"></div>
  <script>
    const ENT_DATA = ${ent};
    const WOR_DATA = ${wor};
    const VFX_DATA = ${vfx};
    const NPC_DATA = ${npc};

    const config = {
      type: Phaser.AUTO,
      parent: "game",
      width: 800,
      height: 600,
      scene: {
        preload: function() {
          this.load.atlas("entities", "../assets/entities.png", ENT_DATA);
          this.load.atlas("world", "../assets/world.png", WOR_DATA);
          this.load.atlas("ui_vfx", "../assets/ui_vfx.png", VFX_DATA);
          this.load.atlas("npc", "../assets/npc.png", NPC_DATA);
        },
        create: function() {
          console.log("Entities has player_idle_0:", this.textures.get("entities").has("player_idle_0"));
          console.log("World has bg_map1:", this.textures.get("world").has("bg_map1"));
          console.log("World has tile_grass:", this.textures.get("world").has("tile_grass"));
          console.log("VFX has title_logo:", this.textures.get("ui_vfx").has("title_logo"));
          console.log("NPC has wizard_idle_0:", this.textures.get("npc").has("wizard_idle_0"));

          this.add.image(400, 300, "world", "bg_map1").setDisplaySize(800, 600);
          this.add.image(200, 400, "entities", "player_idle_0");
          this.add.image(600, 400, "npc", "wizard_idle_0");
          this.add.text(400, 100, "ALL 4 ATLASES LOADED ON FILE://", { fontSize: "24px", color: "#00ff00" }).setOrigin(0.5);
        }
      }
    };
    new Phaser.Game(config);
  </script>
</body>
</html>`;

fs.writeFileSync('scratch/test_all_atlases.html', html, 'utf8');
console.log('Successfully created scratch/test_all_atlases.html');
