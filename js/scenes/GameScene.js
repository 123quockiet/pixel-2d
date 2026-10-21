// ============================================================================
// HẠT GIỐNG TRO TÀN – ĐẠI SỐ VECTƠ | GAME SCENE (PLATFORMER EXPLORATION)
// ============================================================================

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  init(data) {
    this.battleReturnData = data || {};
    this.worldWidth = 7000;
    this.worldHeight = 720;
    this.groundY = 620;
    this.monstersGroup = null;
    this.activeNpc = null;
    this.isDialogueOpen = false;
    this.isShopOpen = false;
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Set world physics bounds
    this.physics.world.setBounds(0, 0, this.worldWidth, this.worldHeight);

    // 1. Parallax Backgrounds
    this.createParallaxBackground();

    // 2. Platforms & Ground
    this.createWorldTerrain();

    // 3. Player Creation
    this.createPlayer();

    // 4. NPCs (Wizard Eldrin & Blacksmith Arthur)
    this.createNPCs();

    // 5. Spawn 10 Monsters along the road
    this.createMonsters();

    // 6. Camera Follow
    this.cameras.main.setBounds(0, 0, this.worldWidth, this.worldHeight);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    // 7. Input Controls (Keyboard)
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    // 8. Persistent In-game HUD
    this.createHUD();

    // 9. Intro Banner
    this.showChapterBanner("Rừng hoang dã – Chương 1");

    // Fade in
    this.cameras.main.fadeIn(400, 0, 0, 0);

    // Handle return from battle if any
    if (this.battleReturnData && this.battleReturnData.defeatedMonsterId) {
      this.handleDefeatedMonster(this.battleReturnData.defeatedMonsterId);
    }
  }

  createParallaxBackground() {
    // Distant mountain sky repeated
    for (let x = 0; x < this.worldWidth; x += 1370) {
      if (this.textures.exists('bg_map1')) {
        const bgM = this.add.image(x, 200, 'bg_map1').setOrigin(0, 0.5).setScrollFactor(0.2);
        bgM.setDisplaySize(1376, 500);
      } else if (this.textures.exists('bg_mountains')) {
        const bgM = this.add.image(x, 200, 'bg_mountains').setOrigin(0, 0.5).setScrollFactor(0.2);
        bgM.setDisplaySize(1376, 500);
      }
      if (this.textures.exists('bg_forest')) {
        const bgF = this.add.image(x, 380, 'bg_forest').setOrigin(0, 0.5).setScrollFactor(0.5);
        bgF.setDisplaySize(1376, 450);
        bgF.setAlpha(0.7);
      }
    }
  }

  createWorldTerrain() {
    this.platforms = this.physics.add.staticGroup();

    // Main Ground spanning the entire 7000px length
    for (let x = 0; x < this.worldWidth; x += 250) {
      let ground;
      if (this.textures.exists('tile_grass')) {
        ground = this.platforms.create(x + 125, this.groundY + 50, 'tile_grass');
        ground.setDisplaySize(250, 120);
        if (ground && typeof ground.refreshBody === 'function') ground.refreshBody();
      } else if (this.textures.exists('world') && this.textures.get('world').has('tile_grass')) {
        ground = this.platforms.create(x + 125, this.groundY + 50, 'world', 'tile_grass');
        ground.setDisplaySize(250, 120);
        if (ground && typeof ground.refreshBody === 'function') ground.refreshBody();
      } else {
        ground = this.add.rectangle(x + 125, this.groundY + 50, 250, 120, 0x3d2817);
        this.physics.add.existing(ground, true);
        this.platforms.add(ground);
      }
    }

    // Elevated platforms & obstacles
    const platformLocs = [
      { x: 1000, y: 480, w: 200 },
      { x: 1600, y: 450, w: 250 },
      { x: 2200, y: 460, w: 200 },
      { x: 2800, y: 440, w: 250 },
      { x: 3400, y: 460, w: 220 },
      { x: 4100, y: 450, w: 260 },
      { x: 4750, y: 440, w: 240 },
      { x: 5400, y: 450, w: 300 }
    ];

    platformLocs.forEach(loc => {
      const p = this.platforms.create(loc.x, loc.y, 'tile_grass');
      p.setDisplaySize(loc.w, 35);
      if (p && typeof p.refreshBody === 'function') p.refreshBody();
    });

    // Decorative cave & chests
    if (this.textures.exists('prop_cave')) {
      this.add.image(6500, this.groundY - 100, 'prop_cave').setDisplaySize(300, 250);
    }
    if (this.textures.exists('prop_chest')) {
      this.add.image(1000, 430, 'prop_chest').setDisplaySize(60, 50);
      this.add.image(2800, 390, 'prop_chest').setDisplaySize(60, 50);
    }
  }

  createPlayer() {
    // If returning from battle, restore position
    const startX = (this.battleReturnData && this.battleReturnData.playerX) ? this.battleReturnData.playerX : 120;
    const startY = this.groundY - 70;

    const initialTexture = this.textures.exists('player_idle_0') ? 'player_idle_0' : 'player_idle';
    this.player = this.physics.add.sprite(startX, startY, initialTexture);
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.35); // Scale appropriately from the high-res 250px frame
    this.player.body.setSize(120, 220);
    this.player.body.setOffset(60, 60);

    if (this.anims.exists('player_idle')) {
      this.player.play('player_idle');
    }

    this.physics.add.collider(this.player, this.platforms);
  }

  createNPCs() {
    this.npcs = this.physics.add.staticGroup();

    // 1. Wizard Eldrin (Wizard Merchant - 100% Sprite Matched)
    const wGroundShadow = this.add.ellipse(260, this.groundY - 2, 64, 14, 0x000000, 0.45).setDepth(3);
    if (this.textures.exists('vfx_magic_rune')) {
      const wPedestal = this.add.image(260, this.groundY - 2, 'vfx_magic_rune');
      wPedestal.setScale(0.55, 0.18).setTint(0x00e5ff).setAlpha(0.65).setDepth(4);
      this.tweens.add({
        targets: wPedestal,
        rotation: Math.PI * 2,
        duration: 9000,
        repeat: -1
      });
    }

    const wizardSprite = this.add.sprite(260, this.groundY - 8, 'wizard_idle_0');
    wizardSprite.setScale(0.58).setOrigin(0.5, 1).setDepth(11);
    if (this.anims.exists('anim_wizard_idle')) {
      wizardSprite.play('anim_wizard_idle');
    }

    const wLabel = this.add.text(260, this.groundY - 128, '🧙‍♂️ Đại Pháp Sư Eldrin [Phím E]', {
      fontFamily: '"Be Vietnam Pro", sans-serif',
      fontWeight: '700',
      fontSize: '10px',
      color: '#ffd700',
      backgroundColor: '#0a0d1e',
      padding: { x: 7, y: 4 }
    }).setOrigin(0.5).setDepth(15);

    wizardSprite.npcType = 'wizard';
    wizardSprite.label = wLabel;
    wizardSprite.currentMode = 'idle';
    this.wizardObj = wizardSprite;

    this.tweens.add({
      targets: wizardSprite,
      y: this.groundY - 12,
      duration: 1600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // 2. Arthur Blacksmith (Blacksmith Merchant - 100% Matched)
    const aGroundShadow = this.add.ellipse(480, this.groundY - 2, 74, 16, 0x000000, 0.45).setDepth(3);

    for (let fi = 0; fi < 6; fi++) {
      const ember = this.add.circle(480 + Phaser.Math.Between(-24, 24), this.groundY - 10, Phaser.Math.Between(1.5, 3), 0xff6600, 0.9).setDepth(10);
      this.tweens.add({
        targets: ember,
        y: this.groundY - Phaser.Math.Between(35, 75),
        x: ember.x + Phaser.Math.Between(-15, 15),
        alpha: 0,
        scale: 0.2,
        duration: 750 + fi * 150,
        repeat: -1,
        delay: fi * 180
      });
    }

    const arthurSprite = this.add.sprite(480, this.groundY - 8, 'blacksmith_forge_0');
    arthurSprite.setScale(0.58).setOrigin(0.5, 1).setDepth(11);
    if (this.anims.exists('anim_blacksmith_forge')) {
      arthurSprite.play('anim_blacksmith_forge');
    }

    const aLabel = this.add.text(480, this.groundY - 128, '⚒️ Bậc Thầy Rèn Arthur [Phím E]', {
      fontFamily: '"Be Vietnam Pro", sans-serif',
      fontWeight: '700',
      fontSize: '10px',
      color: '#ffaa00',
      backgroundColor: '#160808',
      padding: { x: 7, y: 4 }
    }).setOrigin(0.5).setDepth(15);

    arthurSprite.on(Phaser.Animations.Events.ANIMATION_UPDATE, (anim, frame) => {
      if (anim.key === 'anim_blacksmith_forge' && frame.index === 4) {
        this.spawnHammerSparks(480, this.groundY - 35);
      }
    });

    arthurSprite.npcType = 'arthur';
    arthurSprite.label = aLabel;
    arthurSprite.currentMode = 'forge';
    this.arthurObj = arthurSprite;
  }

  spawnHammerSparks(x, y, tintColor = 0xffd700) {
    const flash = this.add.circle(x, y, 6);
    flash.setStrokeStyle(3, tintColor, 0.95);
    flash.setDepth(12);
    this.tweens.add({
      targets: flash,
      radius: 35,
      alpha: 0,
      duration: 220,
      onComplete: () => flash.destroy()
    });

    for (let i = 0; i < 7; i++) {
      const angle = -Math.PI * 0.15 - (i / 7) * Math.PI * 0.7;
      const dist = Phaser.Math.Between(20, 50);
      const sp = this.add.circle(x, y, Phaser.Math.Between(1.5, 3), tintColor, 1).setDepth(13);
      this.tweens.add({
        targets: sp,
        x: x + Math.cos(angle) * dist,
        y: y + Math.sin(angle) * dist,
        alpha: 0,
        scale: 0.1,
        duration: 240,
        onComplete: () => sp.destroy()
      });
    }
  }

  createMonsters() {
    this.monsters = [];
    const monsterDataList = GAME_DATA.monsters;

    monsterDataList.forEach((mData, idx) => {
      // Check if monster already defeated in global state
      if (window.defeatedMonsters && window.defeatedMonsters.includes(mData.id)) {
        return;
      }

      let textureKey = 'mon_' + mData.id;
      if (!this.textures.exists(textureKey)) {
        if (mData.id === 'malakar_p1') textureKey = 'mon_boss_malakar';
        else if (mData.id === 'malakar_p2') textureKey = 'mon_boss_malakar_p2';
        else if (mData.type === 'boss') textureKey = 'mon_boss_malakar';
        else textureKey = 'mon_slime';
      }

      let mScale = 0.58;
      if (mData.id === 'shadow_phoenix') mScale = 0.95;
      else if (mData.id === 'ancient_golem') mScale = 0.72;
      else if (mData.id === 'infernal_demon') mScale = 0.65;
      else if (mData.id === 'acid_basilisk') mScale = 0.68;
      else if (mData.id === 'frost_wraith') mScale = 0.65;
      else if (mData.type === 'boss') mScale = 0.85;
      else if (mData.type === 'medium') mScale = 0.55;

      const isFlying = (mData.id === 'bat' || mData.id === 'bat_vampire' || mData.id === 'shadow_phoenix' || mData.id === 'frost_wraith');
      const startSpawnY = isFlying ? (this.groundY - 85) : (this.groundY - 10);

      const monSprite = this.physics.add.sprite(mData.x, startSpawnY, textureKey);
      monSprite.setOrigin(0.5, 1);
      monSprite.setScale(mScale);
      monSprite.setDepth(10);
      monSprite.setCollideWorldBounds(true);

      if (isFlying) {
        monSprite.body.setAllowGravity(false);
        monSprite.body.immovable = true;
        this.tweens.add({
          targets: monSprite,
          y: this.groundY - 120,
          duration: 550,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        });
      } else {
        this.physics.add.collider(monSprite, this.platforms);
      }

      if (mData.id === 'acid_basilisk' || mData.id === 'infernal_demon' || mData.id === 'ancient_golem' || mData.id === 'shadow_phoenix' || mData.id === 'panther' || mData.id === 'mushroom' || mData.id === 'mushroom_crystal') {
        monSprite.setFlipX(true);
      }

      const isBoss = mData.type === 'boss';
      const monH = monSprite.displayHeight || (isBoss ? 160 : 90);
      const tagColor = isBoss ? '#ff1744' : (mData.type === 'medium' ? '#ffaa00' : '#44ff88');

      let nameTag;
      if (isBoss) {
        nameTag = this.add.text(mData.x, this.groundY - monH - 35, `👑 BOSS 8: ${mData.name.toUpperCase()} 👑`, {
          fontFamily: '"Be Vietnam Pro", sans-serif',
          fontWeight: '900',
          fontSize: '12px',
          color: '#ffd700',
          backgroundColor: '#1b0626',
          stroke: '#a855f7',
          strokeThickness: 3,
          padding: { x: 8, y: 5 }
        }).setOrigin(0.5).setDepth(25);
      } else {
        nameTag = this.add.text(mData.x, this.groundY - monH - 25, `${idx + 1}. ${mData.name}`, {
          fontFamily: '"Be Vietnam Pro", sans-serif',
          fontSize: '9px',
          color: tagColor,
          backgroundColor: '#0a0a16',
          padding: { x: 4, y: 3 }
        }).setOrigin(0.5).setDepth(15);
      }

      const questIconText = isBoss ? '⚔️ KHIÊU CHIẾN BOSS [CLICK / TIẾP CẬN] ⚔️' : '⚔️';
      const questIcon = this.add.text(mData.x, this.groundY - monH - (isBoss ? 65 : 48), questIconText, {
        fontSize: isBoss ? '11px' : '14px',
        fontWeight: isBoss ? '800' : '400',
        fontFamily: '"Be Vietnam Pro", sans-serif',
        color: isBoss ? '#ff3366' : '#ffffff',
        backgroundColor: isBoss ? '#0f051d' : 'transparent',
        padding: isBoss ? { x: 6, y: 2 } : 0
      }).setOrigin(0.5).setDepth(26);

      this.tweens.add({
        targets: questIcon,
        y: this.groundY - monH - (isBoss ? 75 : 58),
        duration: 700,
        yoyo: true,
        repeat: -1
      });

      monSprite.dataRef = mData;
      monSprite.nameTag = nameTag;
      monSprite.questIcon = questIcon;

      // Small patrol idle tween
      this.tweens.add({
        targets: monSprite,
        x: mData.x + 30,
        duration: 2000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });

      this.monsters.push(monSprite);
    });
  }

  handleDefeatedMonster(monsterId) {
    if (!window.defeatedMonsters) window.defeatedMonsters = [];
    if (!window.defeatedMonsters.includes(monsterId)) {
      window.defeatedMonsters.push(monsterId);
    }
    this.showChapterBanner(`ĐÃ DIỆT QUÁI THÀNH CÔNG!`);
  }

  update() {
    if (this.isDialogueOpen || this.isShopOpen) {
      this.player.setVelocityX(0);
      return;
    }

    // Mobile & PC Quick Triggers
    const isDashTriggered = (window.touchControls && window.touchControls.dashJustPressed);
    if (window.touchControls) window.touchControls.dashJustPressed = false;
    if (isDashTriggered) {
      this.performPlayerDash();
    }

    const isAttackTriggered = (window.touchControls && window.touchControls.attackJustPressed);
    if (window.touchControls) window.touchControls.attackJustPressed = false;
    if (isAttackTriggered) {
      this.performPlayerAttack();
    }

    const isHealTriggered = (window.touchControls && window.touchControls.healJustPressed);
    if (window.touchControls) window.touchControls.healJustPressed = false;
    if (isHealTriggered) {
      if (GAME_DATA.player.hp < GAME_DATA.player.maxHp) {
        GAME_DATA.player.hp = Math.min(GAME_DATA.player.maxHp, GAME_DATA.player.hp + 40);
        soundManager.playCorrect();
        this.updateHUD();
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P))) {
      if (typeof window.teleportToBoss === 'function') window.teleportToBoss();
    }

    if (this.isDashing) {
      return;
    }

    const speed = GAME_DATA.player.speed;
    const isMovingLeft = this.cursors.left.isDown || this.keyA.isDown || (window.touchControls && window.touchControls.left);
    const isMovingRight = this.cursors.right.isDown || this.keyD.isDown || (window.touchControls && window.touchControls.right);
    const isJumping = this.cursors.up.isDown || this.keyW.isDown || this.keySpace.isDown || (window.touchControls && window.touchControls.jump);

    if (isMovingLeft) {
      this.player.setVelocityX(-speed);
      this.player.setFlipX(true);
      if (!this.isAttacking && this.player.body.touching.down && this.anims.exists('player_run') && this.player.anims.currentAnim?.key !== 'player_run') {
        this.player.play('player_run');
      }
    } else if (isMovingRight) {
      this.player.setVelocityX(speed);
      this.player.setFlipX(false);
      if (!this.isAttacking && this.player.body.touching.down && this.anims.exists('player_run') && this.player.anims.currentAnim?.key !== 'player_run') {
        this.player.play('player_run');
      }
    } else {
      this.player.setVelocityX(0);
      if (!this.isAttacking && this.player.body.touching.down && this.anims.exists('player_idle') && this.player.anims.currentAnim?.key !== 'player_idle') {
        this.player.play('player_idle');
      }
    }

    // Jump
    if (isJumping && this.player.body.touching.down) {
      this.player.setVelocityY(-420);
      soundManager.playAttack();
    }

    // Proximity check with NPCs
    const distToWizard = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.wizardObj.x, this.wizardObj.y);
    const distToArthur = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.arthurObj.x, this.arthurObj.y);

    const isInteract = Phaser.Input.Keyboard.JustDown(this.keyE) || (window.touchControls && window.touchControls.interactJustPressed);
    if (window.touchControls) window.touchControls.interactJustPressed = false;

    if (isInteract) {
      if (distToWizard < 80) {
        this.openDialogue(GAME_DATA.dialogues.introWizard);
      } else if (distToArthur < 80) {
        this.openShop();
      }
    }

    // Proximity check with Monsters -> Trigger Combat Scene
    this.monsters.forEach(m => {
      if (!m.active) return;
      const isBoss = m.dataRef && m.dataRef.type === 'boss';
      const triggerDist = isBoss ? 165 : 110;
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, m.x, m.y);
      if (dist < triggerDist) {
        this.startCombat(m);
      }
    });

    // Update tags position
    this.monsters.forEach(m => {
      if (m.nameTag) {
        m.nameTag.x = m.x;
        m.questIcon.x = m.x;
      }
    });

    // Update HUD stats
    this.updateHUD();
  }

  performPlayerDash() {
    if (this.isDashing) return;
    this.isDashing = true;
    const dashDir = this.player.flipX ? -1 : 1;
    this.player.setVelocityX(dashDir * 660);
    soundManager.playAttack();

    this.time.delayedCall(220, () => {
      this.isDashing = false;
    });
  }

  performPlayerAttack() {
    if (this.isAttacking) return;
    this.isAttacking = true;

    if (this.anims.exists('player_attack')) {
      this.player.play('player_attack');
    }
    soundManager.playAttack();

    this.monsters.forEach(m => {
      if (!m.active) return;
      const isBoss = m.dataRef && m.dataRef.type === 'boss';
      const strikeRange = isBoss ? 195 : 140;
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, m.x, m.y);
      if (dist < strikeRange) {
        this.startCombat(m);
      }
    });

    this.time.delayedCall(300, () => {
      this.isAttacking = false;
      if (this.player && this.player.active && this.player.body && this.player.body.touching.down && this.anims.exists('player_idle')) {
        this.player.play('player_idle');
      }
    });
  }

  startCombat(monsterSprite) {
    soundManager.playBossRoar();
    this.cameras.main.flash(300, 255, 255, 255);
    this.scene.pause();
    this.scene.launch('CombatScene', {
      monsterData: monsterSprite.dataRef,
      playerX: this.player.x,
      question: GAME_DATA.questions[monsterSprite.dataRef.questionIndex]
    });
  }

  openDialogue(dialogueLines) {
    this.isDialogueOpen = true;
    soundManager.playClick();
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const dlgContainer = this.add.container(0, 0).setScrollFactor(0);
    const dlgBg = this.add.rectangle(width / 2, height - 120, width - 80, 160, 0x111628, 0.96);
    dlgBg.setStrokeStyle(3, 0xffd700);

    let currentIdx = 0;
    const speakerText = this.add.text(60, height - 185, dialogueLines[0].speaker, {
      fontFamily: '"Be Vietnam Pro", sans-serif',
      fontSize: '12px',
      color: '#ffd700'
    });

    const bodyText = this.add.text(60, height - 150, dialogueLines[0].text, {
      fontFamily: '"Be Vietnam Pro", sans-serif',
      fontSize: '11px',
      color: '#ffffff',
      wordWrap: { width: width - 120 }
    });

    const nextPrompt = this.add.text(width - 220, height - 55, 'NHẤP CHUỘT / [E] TIẾP...', {
      fontFamily: '"Be Vietnam Pro", sans-serif',
      fontSize: '9px',
      color: '#00e5ff'
    });

    dlgContainer.add([dlgBg, speakerText, bodyText, nextPrompt]);

    const advance = () => {
      soundManager.playClick();
      currentIdx++;
      if (currentIdx < dialogueLines.length) {
        speakerText.setText(dialogueLines[currentIdx].speaker);
        bodyText.setText(dialogueLines[currentIdx].text);
      } else {
        dlgContainer.destroy();
        this.isDialogueOpen = false;
      }
    };

    dlgBg.setInteractive({ useHandCursor: true });
    dlgBg.on('pointerdown', advance);
  }

  openShop() {
    this.isShopOpen = true;
    soundManager.playClick();
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const shopContainer = this.add.container(0, 0).setScrollFactor(0);
    const dimmer = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.75);
    dimmer.setInteractive();

    const panel = this.add.rectangle(width / 2, height / 2, 700, 440, 0x141829, 0.98);
    panel.setStrokeStyle(3, 0x00e5ff);

    const title = this.add.text(width / 2, height / 2 - 180, '🏪 CỬA HÀNG THỢ RÈN ARTHUR', {
      fontFamily: '"Be Vietnam Pro", sans-serif',
      fontSize: '14px',
      color: '#ffd700'
    }).setOrigin(0.5);

    shopContainer.add([dimmer, panel, title]);

    // Shop item list
    GAME_DATA.shopItems.forEach((item, idx) => {
      const iy = height / 2 - 110 + idx * 70;
      const itemBox = this.add.rectangle(width / 2, iy, 640, 56, 0x222a42);
      itemBox.setStrokeStyle(1, 0x4a6fa5);

      const nameText = this.add.text(width / 2 - 290, iy - 16, item.name, {
        fontFamily: '"Be Vietnam Pro", sans-serif',
        fontSize: '11px',
        color: '#ffffff'
      });

      const descText = this.add.text(width / 2 - 290, iy + 6, item.desc, {
        fontFamily: '"Be Vietnam Pro", sans-serif',
        fontSize: '9px',
        color: '#a0aec0'
      });

      const buyBtn = this.add.rectangle(width / 2 + 230, iy, 120, 36, 0xffaa00);
      buyBtn.setInteractive({ useHandCursor: true });
      const buyText = this.add.text(width / 2 + 230, iy, `${item.cost} VÀNG`, {
        fontFamily: '"Be Vietnam Pro", sans-serif',
        fontSize: '9px',
        color: '#000000'
      }).setOrigin(0.5);

      buyBtn.on('pointerdown', () => {
        if (GAME_DATA.player.gold >= item.cost) {
          GAME_DATA.player.gold -= item.cost;
          soundManager.playCoin();
          if (item.effect.hp) GAME_DATA.player.hp = Math.min(GAME_DATA.player.maxHp, GAME_DATA.player.hp + item.effect.hp);
          if (item.effect.attack) GAME_DATA.player.attack += item.effect.attack;
          if (item.effect.defense) GAME_DATA.player.defense += item.effect.defense;
          buyText.setText("ĐÃ MUA!");
          this.time.delayedCall(800, () => buyText.setText(`${item.cost} VÀNG`));
          this.updateHUD();
        } else {
          soundManager.playWrong();
          buyText.setText("THIẾU VÀNG!");
          this.time.delayedCall(800, () => buyText.setText(`${item.cost} VÀNG`));
        }
      });

      shopContainer.add([itemBox, nameText, descText, buyBtn, buyText]);
    });

    // Close button
    const closeBtn = this.add.rectangle(width / 2, height / 2 + 185, 160, 36, 0xb71c1c);
    closeBtn.setInteractive({ useHandCursor: true });
    const closeText = this.add.text(width / 2, height / 2 + 185, 'ĐÓNG [X]', {
      fontFamily: '"Be Vietnam Pro", sans-serif',
      fontSize: '11px',
      color: '#ffffff'
    }).setOrigin(0.5);

    closeBtn.on('pointerdown', () => {
      soundManager.playClick();
      shopContainer.destroy();
      this.isShopOpen = false;
    });

    shopContainer.add([closeBtn, closeText]);
  }

  createHUD() {
    const width = this.cameras.main.width;
    this.hudGroup = this.add.container(0, 0).setScrollFactor(0);

    // Left HUD Frame: Avatar, HP/MP/EXP
    const hudBox = this.add.rectangle(140, 55, 250, 85, 0x0f1422, 0.9);
    hudBox.setStrokeStyle(2, 0x4a6fa5);

    // Avatar square
    const avatar = this.add.rectangle(45, 55, 45, 45, 0x1e3a8a);
    avatar.setStrokeStyle(2, 0xffd700);
    const avatarIcon = this.add.text(45, 55, '🛡️', { fontSize: '20px' }).setOrigin(0.5);

    // Heart icons (3 hearts)
    this.heartTexts = this.add.text(80, 24, '❤️❤️❤️', { fontSize: '13px' });

    // HP Bar
    this.hpBarBg = this.add.rectangle(170, 48, 120, 10, 0x330000);
    this.hpBarFill = this.add.rectangle(110, 48, 120, 10, 0x00ff66).setOrigin(0, 0.5);
    this.hpLabel = this.add.text(170, 48, '100/100', { fontFamily: '"Be Vietnam Pro", sans-serif', fontSize: '7px', color: '#fff' }).setOrigin(0.5);

    // MP Bar
    this.mpBarBg = this.add.rectangle(170, 64, 120, 10, 0x001133);
    this.mpBarFill = this.add.rectangle(110, 64, 120, 10, 0x00bfff).setOrigin(0, 0.5);

    // EXP Bar
    this.expBarFill = this.add.rectangle(110, 78, 120, 6, 0xffd700).setOrigin(0, 0.5);

    // Right HUD: Gold, Gems, Keys
    const curBox = this.add.rectangle(width - 120, 45, 210, 65, 0x0f1422, 0.9);
    curBox.setStrokeStyle(2, 0x4a6fa5);
    this.goldText = this.add.text(width - 210, 25, '🪙 50 vàng', { fontFamily: '"Be Vietnam Pro", sans-serif', fontSize: '8px', color: '#ffd700' });
    this.gemText = this.add.text(width - 210, 42, '💎 5 đá quý', { fontFamily: '"Be Vietnam Pro", sans-serif', fontSize: '8px', color: '#00e5ff' });
    this.keyText = this.add.text(width - 210, 58, '🗝️ 1 chìa khóa', { fontFamily: '"Be Vietnam Pro", sans-serif', fontSize: '8px', color: '#ffffff' });

    this.hudGroup.add([
      hudBox, avatar, avatarIcon, this.heartTexts,
      this.hpBarBg, this.hpBarFill, this.hpLabel,
      this.mpBarBg, this.mpBarFill, this.expBarFill,
      curBox, this.goldText, this.gemText, this.keyText
    ]);
  }

  updateHUD() {
    const p = GAME_DATA.player;
    // HP
    const hpRatio = Math.max(0, p.hp / p.maxHp);
    this.hpBarFill.width = 120 * hpRatio;
    this.hpLabel.setText(`${Math.max(0, Math.floor(p.hp))}/${p.maxHp}`);

    // Hearts
    let heartsStr = '';
    for (let i = 0; i < p.hearts; i++) heartsStr += '❤️';
    for (let i = p.hearts; i < 3; i++) heartsStr += '🖤';
    this.heartTexts.setText(heartsStr);

    // MP
    const mpRatio = Math.max(0, p.mp / p.maxMp);
    this.mpBarFill.width = 120 * mpRatio;

    // Currency
    this.goldText.setText(`🪙 ${p.gold} vàng`);
    this.gemText.setText(`💎 ${p.gems} đá quý`);
  }

  showChapterBanner(text) {
    const width = this.cameras.main.width;
    const banner = this.add.container(width / 2, 160).setScrollFactor(0);
    const bg = this.add.rectangle(0, 0, 540, 50, 0x000000, 0.85);
    bg.setStrokeStyle(2, 0xffd700);
    const label = this.add.text(0, 0, text, {
      fontFamily: '"Be Vietnam Pro", sans-serif',
      fontSize: '12px',
      color: '#ffd700'
    }).setOrigin(0.5);

    banner.add([bg, label]);
    banner.setScale(0);

    this.tweens.add({
      targets: banner,
      scale: 1,
      duration: 350,
      ease: 'Back.easeOut',
      onComplete: () => {
        this.time.delayedCall(2200, () => {
          this.tweens.add({
            targets: banner,
            alpha: 0,
            y: 120,
            duration: 400,
            onComplete: () => banner.destroy()
          });
        });
      }
    });
  }
}
