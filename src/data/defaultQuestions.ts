import { Question } from '../types';

export const DEFAULT_QUESTIONS: Question[] = [
  {
    id: 'q1',
    question: 'Thủ đô của Việt Nam là thành phố nào?',
    options: ['Đà Nẵng', 'Hà Nội', 'TP. Hồ Chí Minh', 'Huế'],
    correctIndex: 1,
    explanation: 'Hà Nội là thủ đô của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.',
    category: 'Địa lý',
    assignedTeam: 'all'
  },
  {
    id: 'q2',
    question: 'Hành tinh nào gần Mặt Trời nhất trong Hệ Mặt Trời?',
    options: ['Sao Kim', 'Sao Hỏa', 'Sao Thủy', 'Trái Đất'],
    correctIndex: 2,
    explanation: 'Sao Thủy (Mercury) là hành tinh gần Mặt Trời nhất.',
    category: 'Khoa học',
    assignedTeam: 'all'
  },
  {
    id: 'q3',
    question: 'Đỉnh núi nào cao nhất Việt Nam và được mệnh danh là "Nóc nhà Đông Dương"?',
    options: ['Fansipan', 'Bạch Mộc Lương Tử', 'Pu Si Lung', 'Tây Côn Lĩnh'],
    correctIndex: 0,
    explanation: 'Fansipan cao 3.143m thuộc tỉnh Lào Cai là đỉnh núi cao nhất.',
    category: 'Địa lý',
    assignedTeam: 'all'
  },
  {
    id: 'q4',
    question: 'Kim loại nào dẫn điện tốt nhất trong các kim loại sau?',
    options: ['Đồng', 'Vàng', 'Bạc', 'Nhôm'],
    correctIndex: 2,
    explanation: 'Bạc (Ag) là kim loại có độ dẫn điện tốt nhất.',
    category: 'Vật lý',
    assignedTeam: 'all'
  },
  {
    id: 'q5',
    question: 'Tác phẩm "Truyện Kiều" nổi tiếng do đại thi hào nào sáng tác?',
    options: ['Hồ Xuân Hương', 'Nguyễn Du', 'Nguyễn Trãi', 'Cao Bá Quát'],
    correctIndex: 1,
    explanation: 'Đại thi hào Nguyễn Du là tác giả của Đoạn trường tân thanh (Truyện Kiều).',
    category: 'Văn học',
    assignedTeam: 'all'
  },
  {
    id: 'q6',
    question: 'Con sông nào dài nhất thế giới theo ghi nhận phổ biến?',
    options: ['Sông Amazon', 'Sông Nile', 'Sông Mê Kông', 'Sông Dương Tử'],
    correctIndex: 1,
    explanation: 'Sông Nile ở Châu Phi dài khoảng 6.650 km.',
    category: 'Địa lý',
    assignedTeam: 'all'
  },
  {
    id: 'q7',
    question: 'Công thức hóa học của nước là gì?',
    options: ['CO2', 'NaCl', 'H2O', 'O2'],
    correctIndex: 2,
    explanation: 'Phân tử nước bao gồm 2 nguyên tử Hydro và 1 nguyên tử Oxy (H2O).',
    category: 'Hóa học',
    assignedTeam: 'all'
  },
  {
    id: 'q8',
    question: 'Tỉnh nào có diện tích lớn nhất Việt Nam hiện nay?',
    options: ['Lâm Đồng', 'Sơn La', 'Gia Lai', 'Nghệ An'],
    correctIndex: 3,
    explanation: 'Tỉnh Nghệ An có diện tích lớn nhất Việt Nam với hơn 16.490 km².',
    category: 'Địa lý',
    assignedTeam: 'all'
  },
  {
    id: 'q9',
    question: 'Động vật trên cạn nào chạy nhanh nhất hành tinh?',
    options: ['Sư tử', 'Báo săn (Cheetah)', 'Ngựa vằn', 'Linh dương'],
    correctIndex: 1,
    explanation: 'Báo săn có thể đạt vận tốc tối đa lên tới 110 - 120 km/h.',
    category: 'Sinh học',
    assignedTeam: 'all'
  },
  {
    id: 'q10',
    question: 'Cầu thủ bóng đá nào đã giành được nhiều Quả bóng vàng nhất lịch sử?',
    options: ['Cristiano Ronaldo', 'Lionel Messi', 'Pelé', 'Diego Maradona'],
    correctIndex: 1,
    explanation: 'Lionel Messi đã giành được kỷ lục 8 Quả bóng vàng.',
    category: 'Thể thao',
    assignedTeam: 'all'
  },
  {
    id: 'q11',
    question: 'Vạn Lý Trường Thành là công trình kiến trúc nổi tiếng ở quốc gia nào?',
    options: ['Nhật Bản', 'Hàn Quốc', 'Trung Quốc', 'Ấn Độ'],
    correctIndex: 2,
    explanation: 'Vạn Lý Trường Thành là bức tường thành vĩ đại ở Trung Quốc.',
    category: 'Lịch sử',
    assignedTeam: 'all'
  },
  {
    id: 'q12',
    question: 'Chất khí nào chiếm thể tích lớn nhất trong bầu khí quyển Trái Đất?',
    options: ['Oxy (O2)', 'Nitơ (N2)', 'Cacbonic (CO2)', 'Argon (Ar)'],
    correctIndex: 1,
    explanation: 'Khí Nitơ chiếm khoảng 78% thể tích không khí Trái Đất.',
    category: 'Khoa học',
    assignedTeam: 'all'
  },
  {
    id: 'q13',
    question: 'Trong toán học, số nguyên tố nhỏ nhất là số nào?',
    options: ['0', '1', '2', '3'],
    correctIndex: 2,
    explanation: 'Số 2 là số nguyên tố nhỏ nhất và cũng là số nguyên tố chẵn duy nhất.',
    category: 'Toán học',
    assignedTeam: 'all'
  },
  {
    id: 'q14',
    question: 'Nhạc sĩ nào là tác giả của bài hát "Tiến quân ca" (Quốc ca Việt Nam)?',
    options: ['Trịnh Công Sơn', 'Văn Cao', 'Phạm Tuyên', 'Hoàng Vân'],
    correctIndex: 1,
    explanation: 'Nhạc sĩ Văn Cao sáng tác Tiến quân ca vào năm 1944.',
    category: 'Âm nhạc',
    assignedTeam: 'all'
  },
  {
    id: 'q15',
    question: 'Trái Đất quay một vòng quanh Mặt Trời mất khoảng bao lâu?',
    options: ['24 giờ', '30 ngày', '365 ngày 6 giờ', '100 ngày'],
    correctIndex: 2,
    explanation: 'Trái Đất quay một vòng quanh Mặt Trời mất khoảng 365 ngày 6 giờ (1 năm).',
    category: 'Khoa học',
    assignedTeam: 'all'
  },
  {
    id: 'q16',
    question: 'Đảo Phú Quốc thuộc địa phận tỉnh nào của Việt Nam?',
    options: ['Cà Mau', 'Kiên Giang', 'Bạc Liêu', 'An Giang'],
    correctIndex: 1,
    explanation: 'Đảo Phú Quốc là thành phố đảo trực thuộc tỉnh Kiên Giang.',
    category: 'Địa lý',
    assignedTeam: 'all'
  },
  {
    id: 'q17',
    question: 'Cơ quan nào trong cơ thể con người thực hiện việc lọc máu và tạo ra nước tiểu?',
    options: ['Gan', 'Tim', 'Thận', 'Dạ dày'],
    correctIndex: 2,
    explanation: 'Thận đảm nhiệm vai trò lọc các chất thải từ máu để tạo thành nước tiểu.',
    category: 'Sinh học',
    assignedTeam: 'all'
  },
  {
    id: 'q18',
    question: 'Tập hợp các ký tự WWW trong địa chỉ trang web là viết tắt của cụm từ nào?',
    options: ['World Wide Web', 'World Wild Web', 'World With Web', 'Web World Wide'],
    correctIndex: 0,
    explanation: 'WWW là viết tắt của World Wide Web (Mạng lưới thông tin toàn cầu).',
    category: 'Công nghệ',
    assignedTeam: 'all'
  },
  {
    id: 'q19',
    question: 'Chiến thắng Điện Biên Phủ "lừng lẫy năm châu, chấn động địa cầu" diễn ra vào năm nào?',
    options: ['1945', '1954', '1968', '1975'],
    correctIndex: 1,
    explanation: 'Chiến thắng Điện Biên Phủ diễn ra ngày 7 tháng 5 năm 1954.',
    category: 'Lịch sử',
    assignedTeam: 'all'
  },
  {
    id: 'q20',
    question: 'Loài chim nào không biết bay nhưng bơi lội rất giỏi dưới nước lạnh?',
    options: ['Đà điểu', 'Chim cánh cụt', 'Chim công', 'Vẹt biếc'],
    correctIndex: 1,
    explanation: 'Chim cánh cụt thích nghi hoàn hảo với cuộc sống bơi lội dưới biển lạnh.',
    category: 'Động vật',
    assignedTeam: 'all'
  },
  {
    id: 'q21',
    question: 'Trong bảng tuần hoàn hóa học, ký hiệu "Au" đại diện cho nguyên tố nào?',
    options: ['Bạc', 'Đồng', 'Vàng', 'Nhôm'],
    correctIndex: 2,
    explanation: 'Au xuất phát từ tiếng Latin "Aurum", có nghĩa là Vàng.',
    category: 'Hóa học',
    assignedTeam: 'all'
  },
  {
    id: 'q22',
    question: 'Di sản thiên nhiên thế giới Vịnh Hạ Long thuộc tỉnh nào của Việt Nam?',
    options: ['Hải Phòng', 'Quảng Ninh', 'Nam Định', 'Thái Bình'],
    correctIndex: 1,
    explanation: 'Vịnh Hạ Long thuộc tỉnh Quảng Ninh.',
    category: 'Địa lý',
    assignedTeam: 'all'
  },
  {
    id: 'q23',
    question: 'Cây lúa là cây trồng thuộc nhóm cây nào sau đây?',
    options: ['Cây thân gỗ', 'Cây lương thực', 'Cây công nghiệp lâu năm', 'Cây thuốc phiện'],
    correctIndex: 1,
    explanation: 'Cây lúa là cây lương thực chủ yếu cung cấp gạo cho con người.',
    category: 'Nông nghiệp',
    assignedTeam: 'all'
  },
  {
    id: 'q24',
    question: 'Ai là người đầu tiên đặt chân lên Mặt Trăng vào năm 1969?',
    options: ['Yuri Gagarin', 'Neil Armstrong', 'Buzz Aldrin', 'Michael Collins'],
    correctIndex: 1,
    explanation: 'Neil Armstrong là phi hành gia đầu tiên đặt chân lên Mặt Trăng trên tàu Apollo 11.',
    category: 'Khoa học',
    assignedTeam: 'all'
  },
  {
    id: 'q25',
    question: 'Bánh chưng và bánh giầy gắn liền với truyền thuyết về vị hoàng tử nào thời Hùng Vương?',
    options: ['Lang Liêu', 'Thần Trụ Trời', 'Sơn Tinh', 'Mai An Tiêm'],
    correctIndex: 0,
    explanation: 'Hoàng tử Lang Liêu đã làm ra bánh chưng và bánh giầy dâng vua cha.',
    category: 'Dân gian',
    assignedTeam: 'all'
  },
  {
    id: 'q26',
    question: 'Ánh sáng truyền đi trong chân không với tốc độ xấp xỉ bao nhiêu km/s?',
    options: ['300.000 km/s', '150.000 km/s', '1.000.000 km/s', '30.000 km/s'],
    correctIndex: 0,
    explanation: 'Vận tốc ánh sáng xấp xỉ 299.792 km/s (~300.000 km/s).',
    category: 'Vật lý',
    assignedTeam: 'all'
  },
  {
    id: 'q27',
    question: 'Tác giả của bộ truyện tranh "Doraemon" nổi tiếng là ai?',
    options: ['Fujiko F. Fujio', 'Gosho Aoyama', 'Eiichiro Oda', 'Akira Toriyama'],
    correctIndex: 0,
    explanation: 'Bộ đôi họa sĩ Fujiko F. Fujio (Hiroshi Fujimoto và Motoo Abiko) là tác giả của Doraemon.',
    category: 'Văn hóa',
    assignedTeam: 'all'
  },
  {
    id: 'q28',
    question: 'Việt Nam nằm ở khu vực nào của Châu Á?',
    options: ['Đông Bắc Á', 'Nam Á', 'Đông Nam Á', 'Tây Á'],
    correctIndex: 2,
    explanation: 'Việt Nam nằm tại bán đảo Đông Dương thuộc khu vực Đông Nam Á.',
    category: 'Địa lý',
    assignedTeam: 'all'
  },
  {
    id: 'q29',
    question: 'Trong cơ thể người trưởng thành bình thường có bao nhiêu chiếc xương?',
    options: ['186', '206', '256', '306'],
    correctIndex: 1,
    explanation: 'Bộ xương người trưởng thành gồm khoảng 206 chiếc xương.',
    category: 'Y học',
    assignedTeam: 'all'
  },
  {
    id: 'q30',
    question: 'Môn thể thao nào được mệnh danh là "Môn thể thao vua"?',
    options: ['Bóng rổ', 'Quần vợt', 'Bóng đá', 'Bơi lội'],
    correctIndex: 2,
    explanation: 'Bóng đá là môn thể thao phổ biến và được yêu thích nhất toàn cầu.',
    category: 'Thể thao',
    assignedTeam: 'all'
  }
];

export function getRandomQuestions(count: number = 10, pool: Question[] = DEFAULT_QUESTIONS): Question[] {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
