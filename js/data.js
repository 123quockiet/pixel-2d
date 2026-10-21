// ============================================================================
// HẠT GIỐNG TRO TÀN – ĐẠI SỐ VECTƠ | DATA & CONFIGURATION
// ============================================================================

window.GAME_DATA = {
  player: {
    name: "Kael",
    title: "Hiệp Sĩ Ánh Sáng",
    maxHp: 100,
    hp: 100,
    maxMp: 50,
    mp: 50,
    exp: 0,
    maxExp: 100,
    level: 1,
    hearts: 3,
    gold: 50,
    gems: 5,
    keys: 1,
    attack: 25,
    defense: 10,
    speed: 160,
    skills: ["Chém Mạnh", "Lướt Nhanh", "Bão Kiếm"]
  },

  shopItems: [
    { id: "potion_hp", name: "Bình Máu Nhỏ", cost: 20, desc: "Hồi 40 HP ngay lập tức", effect: { hp: 40 } },
    { id: "potion_mp", name: "Bình Mana", cost: 15, desc: "Hồi 30 MP", effect: { mp: 30 } },
    { id: "sword_iron", name: "Thanh Kiếm Rèn Sắt", cost: 60, desc: "+15 Sát thương tấn công", effect: { attack: 15 } },
    { id: "shield_wood", name: "Khiên Gỗ Cổ Thụ", cost: 45, desc: "+8 Giáp phòng thủ", effect: { defense: 8 } }
  ],

  dialogues: {
    introWizard: [
      { speaker: "Pháp Sư Eldrin", text: "Chào Kael! Rừng Hoang Dã đã bị Ma Giáp Malakar nguyền rủa bằng bóng tối hỗn loạn." },
      { speaker: "Pháp Sư Eldrin", text: "Thứ duy nhất phá tan kết giới ma thuật là 'Đại Số Vectơ' – cội nguồn cân bằng phương và hướng của vũ trụ!" },
      { speaker: "Pháp Sư Eldrin", text: "Hãy tiến lên phía đông, giải mã các phong ấn vectơ từ lũ quái vật để cứu lấy Hạt Giống Tro Tàn!" }
    ],
    npcArthur: [
      { speaker: "Thợ Rèn Arthur", text: "Này chàng hiệp sĩ trẻ! Ta có trang bị tốt nhất vùng biên giới này. Hãy ghé xem cửa hàng trước khi đối đầu lũ Orc!" }
    ],
    bossTaunt: [
      { speaker: "Thần Ma Giáp Malakar", text: "Ha ha ha! Một kẻ phàm trần dám dùng tri thức vectơ thách thức sức mạnh bóng tối của ta ư?" },
      { speaker: "Thần Ma Giáp Malakar", text: "Hãy nếm trải đòn hủy diệt của Địa Ngục Hắc Ám!" }
    ],
    victorySpeech: [
      { speaker: "Pháp Sư Eldrin", text: "Ngươi đã làm được Kael! Trật tự vectơ đã được lập lại. Hạt Giống Tro Tàn đã thức tỉnh và nảy mầm vĩnh cửu!" }
    ]
  },

  monsters: [
    // Quái nhỏ - Chương 1: Rừng Hoang Dã (8 Quái vật: phân bố đều x = 750 -> 3550)
    { id: "acid_basilisk", name: "Long Độc Xà", type: "small", hp: 120, maxHp: 120, attack: 14, expReward: 35, goldReward: 25, x: 750, questionIndex: 0, chapter: 1 },
    { id: "infernal_demon", name: "Quỷ Lửa Địa Ngục", type: "small", hp: 140, maxHp: 140, attack: 16, expReward: 40, goldReward: 30, x: 1150, questionIndex: 1, chapter: 1 },
    { id: "frost_wraith", name: "Băng Quyền Ma Lực", type: "small", hp: 160, maxHp: 160, attack: 18, expReward: 45, goldReward: 35, x: 1550, questionIndex: 2, chapter: 1 },
    { id: "ancient_golem", name: "Thổ Thần Cổ Đại", type: "medium", hp: 220, maxHp: 220, attack: 22, expReward: 65, goldReward: 50, x: 1950, questionIndex: 3, chapter: 1 },
    { id: "spider", name: "Nhện Hang Độc", type: "small", hp: 140, maxHp: 140, attack: 18, expReward: 40, goldReward: 28, x: 2350, questionIndex: 4, chapter: 1 },
    { id: "bat", name: "Dơi Bóng Tối", type: "small", hp: 160, maxHp: 160, attack: 20, expReward: 45, goldReward: 32, x: 2750, questionIndex: 5, chapter: 1 },
    { id: "bat_vampire", name: "Dơi Huyết Tộc", type: "small", hp: 180, maxHp: 180, attack: 22, expReward: 50, goldReward: 38, x: 3150, questionIndex: 6, chapter: 1 },
    { id: "shadow_phoenix", name: "Hắc Ám Phượng Hoàng – Chúa Tể Rừng Sâu (Boss 8)", type: "boss", hp: 450, maxHp: 450, attack: 28, expReward: 180, goldReward: 120, x: 3620, questionIndex: 7, chapter: 1 },
    
    // Quái vừa & Trùm Cuối - Chương 2: Hầm Ngục Ma Giáp (7 Quái vật: phân bố đều x = 750 -> 3900)
    { id: "orc_axe", name: "Orc Cầm Rìu", type: "medium", hp: 350, maxHp: 350, attack: 28, expReward: 100, goldReward: 75, x: 750, questionIndex: 8, chapter: 2 },
    { id: "orc_armor", name: "Orc Thiết Giáp", type: "medium", hp: 400, maxHp: 400, attack: 31, expReward: 115, goldReward: 85, x: 1250, questionIndex: 9, chapter: 2 },
    { id: "orc_enrage", name: "Orc Cuồng Nộ", type: "medium", hp: 480, maxHp: 480, attack: 35, expReward: 135, goldReward: 100, x: 1750, questionIndex: 10, chapter: 2 },
    { id: "orc_shaman", name: "Orc Pháp Sư Hắc Ám", type: "medium", hp: 540, maxHp: 540, attack: 38, expReward: 155, goldReward: 115, x: 2250, questionIndex: 11, chapter: 2 },
    { id: "orc_leader", name: "Orc Thủ Lĩnh Cầm Búa", type: "medium", hp: 650, maxHp: 650, attack: 42, expReward: 180, goldReward: 135, x: 2800, questionIndex: 12, chapter: 2 },
    { id: "malakar_p1", name: "Malakar - Thần Ma Giáp (Giai Đoạn 1)", type: "boss", hp: 25000, maxHp: 50000, attack: 48, expReward: 300, goldReward: 200, x: 3350, questionIndex: 13, chapter: 2 },
    { id: "malakar_p2", name: "Malakar - Thần Ma Giáp (Đòn Kết Liễu)", type: "boss", hp: 50000, maxHp: 50000, attack: 58, expReward: 600, goldReward: 400, x: 3900, questionIndex: 14, chapter: 2 }
  ],

  // 15 CÂU HỎI LÝ THUYẾT VECTƠ CHUẨN XÁC THEO ĐẠI SỐ HÌNH HỌC LỚP 10
  questions: [
    {
      id: 1,
      monsterTitle: "Quái vật 1: Long Độc Xà (Định nghĩa vectơ)",
      question: "Trong toán học và hình học, vectơ được định nghĩa là gì?",
      options: [
        "A. Một đoạn thẳng không phân biệt thứ tự hai đầu mút",
        "B. Một đoạn thẳng có hướng (xác định điểm đầu và điểm cuối)",
        "C. Một đường thẳng kéo dài vô tận về hai phía",
        "D. Một tia xuất phát từ gốc tọa độ"
      ],
      correct: 1,
      hint: "Vectơ là một đoạn thẳng có hướng: điểm thứ nhất là điểm đầu (gốc), điểm thứ hai là điểm cuối (ngọn)."
    },
    {
      id: 2,
      monsterTitle: "Quái vật 2: Quỷ Lửa Địa Ngục (Vectơ đối nhau)",
      question: "Hai vectơ đối nhau là hai vectơ thỏa mãn điều kiện nào sau đây?",
      options: [
        "A. Cùng độ dài và cùng hướng",
        "B. Cùng độ dài và ngược hướng",
        "C. Vuông góc với nhau và cùng độ dài",
        "D. Chung điểm đầu và có độ dài bằng nhau"
      ],
      correct: 1,
      hint: "Hai vectơ đối nhau khi chúng ngược hướng và có cùng độ dài. Tổng của hai vectơ đối nhau luôn bằng vectơ-không: a⃗ + (-a⃗) = 0⃗."
    },
    {
      id: 3,
      monsterTitle: "Quái vật 3: Băng Quyền Ma Lực (Ký hiệu điểm đầu - điểm cuối)",
      question: "Với vectơ AB⃗ (điểm đầu A, điểm cuối B), vectơ đối của AB⃗ là vectơ nào sau đây?",
      options: [
        "A. BA⃗",
        "B. -BA⃗",
        "C. AB⃗",
        "D. 0⃗"
      ],
      correct: 0,
      hint: "Vectơ đối của AB⃗ là -AB⃗ = BA⃗ (đổi ngược chiều điểm đầu và điểm cuối)."
    },
    {
      id: 4,
      monsterTitle: "Quái vật 4: Thổ Thần Cổ Đại (Hai vectơ cùng phương)",
      question: "Hai vectơ được gọi là cùng phương khi giá của chúng có vị trí tương đối như thế nào?",
      options: [
        "A. Vuông góc với nhau",
        "B. Cắt nhau tại một điểm duy nhất",
        "C. Song song hoặc trùng nhau",
        "D. Chéo nhau trong không gian"
      ],
      correct: 2,
      hint: "Giá của vectơ là đường thẳng đi qua điểm đầu và điểm cuối. Hai vectơ cùng phương <=> các giá của chúng song song hoặc trùng nhau."
    },
    {
      id: 5,
      monsterTitle: "Quái vật 5: Nhện Hang Độc (Hai vectơ bằng nhau)",
      question: "Hai vectơ a⃗ và b⃗ được gọi là bằng nhau (a⃗ = b⃗) khi và chỉ khi:",
      options: [
        "A. Chúng cùng phương và cùng độ dài",
        "B. Chúng cùng hướng và cùng độ dài (|a⃗| = |b⃗|)",
        "C. Chúng có cùng điểm đầu và cùng điểm cuối",
        "D. Chúng ngược hướng và cùng độ dài"
      ],
      correct: 1,
      hint: "Định nghĩa hai vectơ bằng nhau: a⃗ = b⃗ <=> a⃗ cùng hướng với b⃗ và |a⃗| = |b⃗|."
    },
    {
      id: 6,
      monsterTitle: "Quái vật 6: Dơi Bóng Tối (Vectơ-không)",
      question: "Mệnh đề nào sau đây là ĐÚNG về vectơ-không (ký hiệu 0⃗)?",
      options: [
        "A. Có độ dài bằng 0 và cùng phương, cùng hướng với mọi vectơ",
        "B. Điểm đầu và điểm cuối luôn luôn phân biệt",
        "C. Độ dài của vectơ-không luôn bằng 1",
        "D. Không thể cộng hoặc trừ với vectơ khác"
      ],
      correct: 0,
      hint: "Vectơ-không (AA⃗ = 0⃗) có độ dài bằng 0, điểm đầu trùng điểm cuối, cùng phương và cùng hướng với mọi vectơ."
    },
    {
      id: 7,
      monsterTitle: "Quái vật 7: Dơi Huyết Tộc (Quy tắc trừ chung gốc)",
      question: "Với ba điểm O, A, B bất kỳ, theo quy tắc hiệu (trừ hai vectơ chung gốc), hiệu OB⃗ - OA⃗ bằng vectơ nào?",
      options: [
        "A. AB⃗",
        "B. BA⃗",
        "C. OA⃗",
        "D. 0⃗"
      ],
      correct: 0,
      hint: "Quy tắc trừ chung gốc: OB⃗ - OA⃗ = AB⃗ (điểm sau A nối sang điểm trước B)."
    },
    {
      id: 8,
      monsterTitle: "Boss 8: Hắc Ám Phượng Hoàng (Quy tắc 3 điểm cộng nối đuôi)",
      question: "Cho ba điểm A, B, C bất kỳ. Theo quy tắc 3 điểm (nối đuôi liên tiếp), tổng AB⃗ + BC⃗ bằng vectơ nào?",
      options: [
        "A. CA⃗",
        "B. AC⃗",
        "C. BA⃗",
        "D. 2AC⃗"
      ],
      correct: 1,
      hint: "Quy tắc Chasles (nối đuôi): AB⃗ + BC⃗ = AC⃗ (điểm ngọn của vectơ trước trùng điểm gốc của vectơ sau)."
    },
    {
      id: 9,
      monsterTitle: "Quái vật 9: Orc Cầm Rìu (Quy tắc hình bình hành)",
      question: "Nếu ABCD là một hình bình hành, theo quy tắc hình bình hành ta có hệ thức nào sau đây?",
      options: [
        "A. AB⃗ + AD⃗ = AC⃗",
        "B. AB⃗ + AC⃗ = AD⃗",
        "C. AB⃗ + AD⃗ = BD⃗",
        "D. AB⃗ - AD⃗ = AC⃗"
      ],
      correct: 0,
      hint: "Quy tắc hình bình hành: Tổng hai vectơ cạnh chung gốc bằng vectơ đường chéo xuất phát từ gốc đó: AB⃗ + AD⃗ = AC⃗."
    },
    {
      id: 10,
      monsterTitle: "Quái vật 10: Orc Thiết Giáp (Hệ thức trung điểm)",
      question: "Cho I là trung điểm của đoạn thẳng AB và M là một điểm bất kỳ. Đẳng thức vectơ nào sau đây luôn ĐÚNG?",
      options: [
        "A. MA⃗ + MB⃗ = MI⃗",
        "B. MA⃗ + MB⃗ = 2MI⃗",
        "C. MA⃗ - MB⃗ = 2MI⃗",
        "D. IA⃗ = IB⃗"
      ],
      correct: 1,
      hint: "Hệ thức trung điểm tổng quát: Với mọi điểm M, MA⃗ + MB⃗ = 2MI⃗ (do IA⃗ + IB⃗ = 0⃗)."
    },
    {
      id: 11,
      monsterTitle: "Quái vật 11: Orc Cuồng Nộ (Tích vectơ với một số)",
      question: "Cho vectơ a⃗ ≠ 0⃗ và số thực k. Vectơ k·a⃗ sẽ ngược hướng với vectơ a⃗ khi nào?",
      options: [
        "A. k > 0",
        "B. k = 0",
        "C. k < 0",
        "D. k = 1"
      ],
      correct: 2,
      hint: "Định nghĩa tích vectơ với một số thực: k·a⃗ cùng hướng a⃗ khi k > 0, và ngược hướng a⃗ khi k < 0."
    },
    {
      id: 12,
      monsterTitle: "Quái vật 12: Orc Pháp Sư Hắc Ám (Độ dài vectơ trong Oxy)",
      question: "Trong mặt phẳng tọa độ Oxy, cho vectơ u⃗ = (3; -4). Độ dài của vectơ u⃗ (|u⃗|) bằng bao nhiêu?",
      options: [
        "A. 7",
        "B. -1",
        "C. 5",
        "D. 25"
      ],
      correct: 2,
      hint: "Công thức tính độ dài vectơ: |u⃗| = √(x² + y²) = √(3² + (-4)²) = √(9 + 16) = √25 = 5."
    },
    {
      id: 13,
      monsterTitle: "Quái vật 13: Orc Thủ Lĩnh Cầm Búa (Tích vô hướng trong Oxy)",
      question: "Trong mặt phẳng Oxy, cho a⃗ = (1; 2) và b⃗ = (3; 4). Tích vô hướng a⃗ · b⃗ có giá trị bằng bao nhiêu?",
      options: [
        "A. 11",
        "B. (3; 8)",
        "C. 14",
        "D. 7"
      ],
      correct: 0,
      hint: "Công thức tích vô hướng theo tọa độ: a⃗ · b⃗ = x₁·x₂ + y₁·y₂ = 1·3 + 2·4 = 3 + 8 = 11."
    },
    {
      id: 14,
      monsterTitle: "Trùm Malakar P1 (Hệ thức trọng tâm tam giác)",
      question: "Cho G là trọng tâm tam giác ABC và M là một điểm bất kỳ trong mặt phẳng. Đẳng thức vectơ nào sau đây ĐÚNG?",
      options: [
        "A. MA⃗ + MB⃗ + MC⃗ = 3MG⃗",
        "B. MA⃗ + MB⃗ + MC⃗ = MG⃗",
        "C. GA⃗ + GB⃗ + GC⃗ = 3MG⃗",
        "D. MA⃗ + MB⃗ = MC⃗ + MG⃗"
      ],
      correct: 0,
      hint: "Vì G là trọng tâm tam giác ABC nên GA⃗ + GB⃗ + GC⃗ = 0⃗. Do đó với mọi điểm M: MA⃗ + MB⃗ + MC⃗ = 3MG⃗."
    },
    {
      id: 15,
      monsterTitle: "Trùm Malakar P2 (Hai vectơ vuông góc trong Oxy)",
      question: "Trong mặt phẳng Oxy, hai vectơ a⃗ = (x₁; y₁) và b⃗ = (x₂; y₂) khác 0⃗ vuông góc với nhau (a⃗ ⊥ b⃗) khi và chỉ khi:",
      options: [
        "A. x₁·x₂ - y₁·y₂ = 0",
        "B. x₁·x₂ + y₁·y₂ = 0 (tích vô hướng a⃗ · b⃗ = 0)",
        "C. x₁·y₂ - x₂·y₁ = 0",
        "D. |a⃗| = |b⃗|"
      ],
      correct: 1,
      hint: "Điều kiện hai vectơ vuông góc: a⃗ ⊥ b⃗ <=> a⃗ · b⃗ = 0 <=> x₁·x₂ + y₁·y₂ = 0."
    }
  ]
};
