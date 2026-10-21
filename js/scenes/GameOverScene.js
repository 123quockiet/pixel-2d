// ============================================================================
// HẠT GIỐNG TRO TÀN – ĐẠI SỐ VECTƠ | GAME OVER SCENE
// ============================================================================

class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Dark red death background
    this.add.rectangle(width / 2, height / 2, width, height, 0x180509);

    // Skull icon
    this.add.text(width / 2, 160, '💀', { fontSize: '48px' }).setOrigin(0.5);

    // Title
    const title = this.add.text(width / 2, 240, 'Bạn đã tử trận', {
      fontFamily: '"Be Vietnam Pro", sans-serif',
      fontWeight: '700',
      fontSize: '28px',
      color: '#ff2244',
      stroke: '#000000',
      strokeThickness: 8
    }).setOrigin(0.5);

    this.tweens.add({
      targets: title,
      scale: 1.05,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    this.add.text(width / 2, 290, 'Bóng tối Malakar đã nuốt chửng linh hồn Kael...', {
      fontFamily: '"Be Vietnam Pro", sans-serif',
      fontWeight: '600',
      fontSize: '12px',
      color: '#a0aec0'
    }).setOrigin(0.5);

    // Tip card
    const tipBox = this.add.rectangle(width / 2, 380, 580, 110, 0x2b0f16, 0.9);
    tipBox.setStrokeStyle(2, 0xff2244);

    const tip = [
      'Gợi ý Vectơ:',
      '• Đọc kỹ câu hỏi và các điều kiện cùng hướng, cùng phương.',
      '• Nhớ quy tắc 3 điểm: AB + BC = AC (nối đuôi điểm B).',
      '• Ghé cửa hàng thợ rèn Arthur mua thêm bình máu trước khi chiến đấu!'
    ];

    this.add.text(width / 2, 380, tip.join('\n'), {
      fontFamily: '"Be Vietnam Pro", sans-serif',
      fontWeight: '600',
      fontSize: '11px',
      color: '#ffcccc',
      align: 'left',
      lineSpacing: 8
    }).setOrigin(0.5);

    // Respawn button
    const btn = this.add.rectangle(width / 2, 510, 320, 48, 0x991b1b);
    btn.setStrokeStyle(2, 0xffd700);
    const btnText = this.add.text(width / 2, 510, 'Hồi sinh (Thử lại)', {
      fontFamily: '"Be Vietnam Pro", sans-serif',
      fontWeight: '700',
      fontSize: '13px',
      color: '#ffffff'
    }).setOrigin(0.5);

    btn.setInteractive({ useHandCursor: true });
    btn.on('pointerover', () => {
      btn.fillColor = 0xb91c1c;
      btnText.setColor('#ffd700');
    });
    btn.on('pointerout', () => {
      btn.fillColor = 0x991b1b;
      btnText.setColor('#ffffff');
    });

    btn.on('pointerdown', () => {
      soundManager.playClick();
      GAME_DATA.player.hp = GAME_DATA.player.maxHp;
      GAME_DATA.player.mp = GAME_DATA.player.maxMp;
      GAME_DATA.player.hearts = 3;
      GAME_DATA.player.gold = 50;
      window.defeatedMonsters = [];
      window.currentChapter = 1;
      this.scene.start('GameScene', { chapter: 1, playerX: 140 });
    });
  }
}
