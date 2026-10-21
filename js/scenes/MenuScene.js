// ============================================================================
// HẠT GIỐNG TRO TÀN – ĐẠI SỐ VECTƠ | MENU SCENE
// ============================================================================

class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background: Draw Parallax forest or UI menu
    if (this.textures.exists('asset_ui_menu')) {
      const bg = this.add.image(width / 2, height / 2, 'asset_ui_menu');
      bg.setDisplaySize(width, height);
      bg.setAlpha(0.45);
    } else {
      this.add.rectangle(width / 2, height / 2, width, height, 0x0e0824);
    }

    // Particle embers
    for (let i = 0; i < 35; i++) {
      const px = Phaser.Math.Between(0, width);
      const py = Phaser.Math.Between(0, height);
      const ember = this.add.circle(px, py, Phaser.Math.Between(1, 3), 0xffaa00, 0.7);
      this.tweens.add({
        targets: ember,
        y: py - Phaser.Math.Between(80, 200),
        x: px + Phaser.Math.Between(-40, 40),
        alpha: 0,
        duration: Phaser.Math.Between(2500, 5000),
        repeat: -1,
        delay: Phaser.Math.Between(0, 3000)
      });
    }

    // Game Title Card
    const titleBox = this.add.rectangle(width / 2, 130, 760, 150, 0x110d24, 0.88);
    titleBox.setStrokeStyle(3, 0xffd700);

    const titleText = this.add.text(width / 2, 110, 'Hạt Giống Tro Tàn', {
      fontFamily: '"Be Vietnam Pro", sans-serif',
      fontWeight: '700',
      fontSize: '34px',
      color: '#ffd700',
      stroke: '#000000',
      strokeThickness: 8
    }).setOrigin(0.5);

    const subtitleText = this.add.text(width / 2, 160, '⚔ Đại Số Vectơ – Hành trình tri thức ⚔', {
      fontFamily: '"Be Vietnam Pro", sans-serif',
      fontWeight: '600',
      fontSize: '14px',
      color: '#00e5ff'
    }).setOrigin(0.5);

    // Subtle pulsing animation on title
    this.tweens.add({
      targets: [titleText, subtitleText],
      scale: 1.03,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Add keyboard start (SPACE, ENTER)
    this.input.keyboard.on('keydown-SPACE', () => {
      this.startGame();
    });
    this.input.keyboard.on('keydown-ENTER', () => {
      this.startGame();
    });

    // Menu Buttons
    const btnStartY = 310;
    const btnGap = 70;

    const btnNewGame = this.createMenuButton(width / 2, btnStartY, 'Chơi mới (Phím cách / Enter)', () => {
      this.startGame();
    });

    const btnHowToPlay = this.createMenuButton(width / 2, btnStartY + btnGap, 'Hướng dẫn điều khiển', () => {
      soundManager.playClick();
      this.showGuideModal();
    });

    const btnAudio = this.createMenuButton(width / 2, btnStartY + btnGap * 2, 'Âm thanh: Bật / Tắt', () => {
      const isMuted = soundManager.toggleMute();
      btnAudio.textObj.setText(isMuted ? 'Âm thanh: [Đã tắt]' : 'Âm thanh: [Đang bật]');
    });

    // Character preview portrait
    if (this.textures.exists('player_idle_0')) {
      const playerPreview = this.add.sprite(width / 2 - 280, 420, 'player_idle_0');
      playerPreview.setScale(0.55);
      if (this.anims.exists('player_idle')) {
        playerPreview.play('player_idle');
      }
    }

    // Footer info
    this.add.text(width / 2, height - 30, '© 2026 Hạt Giống Tro Tàn • Sẵn sàng triển khai trên GitHub Pages', {
      fontFamily: '"Be Vietnam Pro", sans-serif',
      fontSize: '9px',
      color: '#8c8cba'
    }).setOrigin(0.5);

    this.cameras.main.fadeIn(400, 0, 0, 0);
  }

  startGame() {
    if (this.starting) return;
    this.starting = true;
    window.currentChapter = 1;
    window.defeatedMonsters = [];
    if (typeof window !== 'undefined' && window.location && window.history && window.history.replaceState) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    GAME_DATA.player.hp = GAME_DATA.player.maxHp;
    GAME_DATA.player.mp = GAME_DATA.player.maxMp;
    GAME_DATA.player.hearts = 3;
    GAME_DATA.player.gold = 50;
    GAME_DATA.player.exp = 0;
    GAME_DATA.player.level = 1;
    soundManager.playClick();
    soundManager.startBGM();
    this.cameras.main.fadeOut(300, 0, 0, 0);
    this.time.delayedCall(350, () => {
      this.scene.start('GameScene', { chapter: 1, playerX: 140 });
    });
  }

  createMenuButton(x, y, label, onClick) {
    const btnW = 420;
    const btnH = 50;

    const bg = this.add.rectangle(x, y, btnW, btnH, 0x1f2438, 0.95);
    bg.setStrokeStyle(2, 0x4a6fa5);

    const textObj = this.add.text(x, y, label, {
      fontFamily: '"Be Vietnam Pro", sans-serif',
      fontSize: '11px',
      color: '#ffffff'
    }).setOrigin(0.5);

    bg.setInteractive({ useHandCursor: true });
    textObj.setInteractive({ useHandCursor: true });

    const onHover = () => {
      bg.fillColor = 0x364166;
      bg.setStrokeStyle(3, 0xffd700);
      textObj.setColor('#ffd700');
      soundManager.playClick();
    };

    const onOut = () => {
      bg.fillColor = 0x1f2438;
      bg.setStrokeStyle(2, 0x4a6fa5);
      textObj.setColor('#ffffff');
    };

    bg.on('pointerover', onHover);
    textObj.on('pointerover', onHover);
    bg.on('pointerout', onOut);
    textObj.on('pointerout', onOut);

    bg.on('pointerdown', onClick);
    textObj.on('pointerdown', onClick);

    return { bg, textObj };
  }

  showGuideModal() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const modalGroup = this.add.container(0, 0);
    const dimmer = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.75);
    dimmer.setInteractive();

    const panel = this.add.rectangle(width / 2, height / 2, 740, 480, 0x141829, 0.98);
    panel.setStrokeStyle(3, 0x00e5ff);

    const title = this.add.text(width / 2, height / 2 - 205, '📖 Hướng Dẫn Điều Khiển & Chiến Đấu', {
      fontFamily: '"Be Vietnam Pro", sans-serif',
      fontWeight: '700',
      fontSize: '17px',
      color: '#ffd700'
    }).setOrigin(0.5);

    const divider = this.add.rectangle(width / 2, height / 2 - 180, 680, 2, 0x4a6fa5, 0.6);

    const guideContent = [
      '1. Di chuyển: Phím [A]/[D] hoặc Mũi tên Trái / Phải.',
      '2. Nhảy cao: Phím [W], [Phím cách - SPACE] hoặc Mũi tên Lên.',
      '3. Tương tác: Phím [E] để trò chuyện Pháp sư hoặc Mở Cửa hàng Arthur.',
      '4. Túi đồ & chỉ số: Phím [I] hoặc [C] để mở Bảng quản lý nhân vật.',
      '5. Chiến đấu Vectơ: Tiếp cận quái vật để kích hoạt Đấu trường giải đố.',
      '   - Trả lời đúng: Kael tung đòn chém chí mạng diệt quái, nhận Vàng & EXP!',
      '   - Trả lời sai: Quái phản đòn sát thương, Kael mất HP & Trái tim.',
      '6. Thử thách 10 câu hỏi: Vượt qua 4 Quái nhỏ -> 4 Quái vừa -> Trùm Malakar!'
    ];

    const bodyText = this.add.text(width / 2 - 330, height / 2 - 160, guideContent.join('\n\n'), {
      fontFamily: '"Be Vietnam Pro", sans-serif',
      fontWeight: '500',
      fontSize: '13px',
      color: '#e4ecf7',
      align: 'left',
      lineSpacing: 8
    }).setOrigin(0, 0);

    const closeBtnBg = this.add.rectangle(width / 2, height / 2 + 205, 180, 40, 0x2b3552);
    closeBtnBg.setStrokeStyle(2, 0xffd700);
    const closeBtnText = this.add.text(width / 2, height / 2 + 205, 'Đã hiểu [X]', {
      fontFamily: '"Be Vietnam Pro", sans-serif',
      fontWeight: '700',
      fontSize: '13px',
      color: '#ffffff'
    }).setOrigin(0.5);

    closeBtnBg.setInteractive({ useHandCursor: true });
    closeBtnBg.on('pointerdown', () => {
      soundManager.playClick();
      modalGroup.destroy();
    });

    modalGroup.add([dimmer, panel, title, divider, bodyText, closeBtnBg, closeBtnText]);
  }
}
