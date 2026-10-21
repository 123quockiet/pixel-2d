const fs = require('fs');

const ent = JSON.stringify(JSON.parse(fs.readFileSync('assets/entities.json', 'utf8')));
const wor = JSON.stringify(JSON.parse(fs.readFileSync('assets/world.json', 'utf8')));
const vfx = JSON.stringify(JSON.parse(fs.readFileSync('assets/ui_vfx.json', 'utf8')));
const npc = JSON.stringify(JSON.parse(fs.readFileSync('assets/npc.json', 'utf8')));

let html = fs.readFileSync('index.html', 'utf8');

const targetPreloadMarker = `// ----------------------------------------------------------------------------
// 3. PRELOAD SCENE
// ----------------------------------------------------------------------------
class PreloadScene extends Phaser.Scene {`;

const atlasConsts = `// ----------------------------------------------------------------------------
// 3. EMBEDDED ATLAS METADATA (Cross-Origin / file:// Friendly)
// ----------------------------------------------------------------------------
const ATLAS_DATA_ENTITIES = ${ent};
const ATLAS_DATA_WORLD = ${wor};
const ATLAS_DATA_UI_VFX = ${vfx};
const ATLAS_DATA_NPC = ${npc};

// ----------------------------------------------------------------------------
// PRELOAD SCENE
// ----------------------------------------------------------------------------
class PreloadScene extends Phaser.Scene {`;

if (!html.includes(targetPreloadMarker)) {
  console.error('Target preload marker not found!');
  process.exit(1);
}

html = html.replace(targetPreloadMarker, atlasConsts);

const oldLoadCode = `    // Load the 4 consolidated game asset files (Atlas + Metadata)
    this.load.atlas('entities', 'assets/entities.png', 'assets/entities.json');
    this.load.atlas('world', 'assets/world.png', 'assets/world.json');
    this.load.atlas('ui_vfx', 'assets/ui_vfx.png', 'assets/ui_vfx.json');
    this.load.atlas('npc', 'assets/npc.png', 'assets/npc.json');`;

const newLoadCode = `    // Load the 4 consolidated game asset files (Atlas + Metadata)
    // Using inlined JSON data objects so that game works directly via file:// without CORS errors
    this.load.atlas('entities', 'assets/entities.png', ATLAS_DATA_ENTITIES);
    this.load.atlas('world', 'assets/world.png', ATLAS_DATA_WORLD);
    this.load.atlas('ui_vfx', 'assets/ui_vfx.png', ATLAS_DATA_UI_VFX);
    this.load.atlas('npc', 'assets/npc.png', ATLAS_DATA_NPC);`;

if (!html.includes(oldLoadCode)) {
  console.error('Old load code not found!');
  process.exit(1);
}

html = html.replace(oldLoadCode, newLoadCode);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated index.html with inlined atlas metadata!');
