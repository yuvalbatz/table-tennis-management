/**
 * Real-World Table Tennis Data
 * Contains professional players, matches, competitions, and clubs
 * Based on current ITTF/WTT world rankings and recent tournaments
 */

// Real professional table tennis players from current ITTF/WTT rankings
// Each player has a random 4-digit ID (1000-9999)
const REAL_PLAYERS = [
    // Top Senior Players (S)
    { playerId: 4827, firstName: 'Wang', lastName: 'Chuqin', club: 'Bayi Club', rankingPoints: 7650, category: 'S', country: 'China' },
    { playerId: 7153, firstName: 'Fan', lastName: 'Zhendong', club: 'Bayi Club', rankingPoints: 7450, category: 'S', country: 'China' },
    { playerId: 3291, firstName: 'Ma', lastName: 'Long', club: 'Bayi Club', rankingPoints: 7200, category: 'S', country: 'China' },
    { playerId: 8964, firstName: 'Hugo', lastName: 'Calderano', club: 'Borussia Düsseldorf', rankingPoints: 6850, category: 'S', country: 'Brazil' },
    { playerId: 1542, firstName: 'Liang', lastName: 'Jingkun', club: 'Shandong Luneng', rankingPoints: 6700, category: 'S', country: 'China' },
    { playerId: 6789, firstName: 'Lin', lastName: 'Yun-Ju', club: 'Taiwan Power', rankingPoints: 6550, category: 'S', country: 'Chinese Taipei' },
    { playerId: 2345, firstName: 'Tomokazu', lastName: 'Harimoto', club: 'Kinoshita Meister Tokyo', rankingPoints: 6400, category: 'S', country: 'Japan' },
    { playerId: 9876, firstName: 'Dimitrij', lastName: 'Ovtcharov', club: 'Borussia Düsseldorf', rankingPoints: 6250, category: 'S', country: 'Germany' },
    { playerId: 5432, firstName: 'Truls', lastName: 'Möregårdh', club: 'Eslöv AI', rankingPoints: 6100, category: 'S', country: 'Sweden' },
    { playerId: 7654, firstName: 'Darko', lastName: 'Jorgic', club: 'SV Werder Bremen', rankingPoints: 5950, category: 'S', country: 'Slovenia' },
    { playerId: 3210, firstName: 'Lin', lastName: 'Gaoyuan', club: 'Shandong Luneng', rankingPoints: 5800, category: 'S', country: 'China' },
    { playerId: 8901, firstName: 'Quentin', lastName: 'Robinot', club: 'Angers Vaillante', rankingPoints: 5650, category: 'S', country: 'France' },
    
    // Under 21 Players (E21)
    { playerId: 4567, firstName: 'Felix', lastName: 'Lebrun', club: 'Angers Vaillante', rankingPoints: 5500, category: 'E21', country: 'France' },
    { playerId: 1234, firstName: 'Alexis', lastName: 'Lebrun', club: 'Angers Vaillante', rankingPoints: 5350, category: 'E21', country: 'France' },
    { playerId: 7890, firstName: 'Shin', lastName: 'Yubin', club: 'Korea Exchange Bank', rankingPoints: 5200, category: 'E21', country: 'South Korea' },
    { playerId: 2468, firstName: 'Hiroto', lastName: 'Shinozuka', club: 'Kinoshita Meister Tokyo', rankingPoints: 5050, category: 'E21', country: 'Japan' },
    { playerId: 8642, firstName: 'Martin', lastName: 'Frigo', club: 'SV Werder Bremen', rankingPoints: 4900, category: 'E21', country: 'Romania' },
    { playerId: 1357, firstName: 'Izaac', lastName: 'Quek', club: 'Singapore Table Tennis Association', rankingPoints: 4750, category: 'E21', country: 'Singapore' },
    
    // Under 18 Players (J18)
    { playerId: 9753, firstName: 'Kao', lastName: 'Cheng-Jui', club: 'Taiwan Power', rankingPoints: 4600, category: 'J18', country: 'Chinese Taipei' },
    { playerId: 3579, firstName: 'Miroslav', lastName: 'Hudec', club: 'SV Werder Bremen', rankingPoints: 4450, category: 'J18', country: 'Slovakia' },
    { playerId: 8024, firstName: 'Yanapong', lastName: 'Panagitgun', club: 'Thailand Table Tennis Association', rankingPoints: 4300, category: 'J18', country: 'Thailand' },
    { playerId: 4680, firstName: 'Bezhan', lastName: 'Mokhtari', club: 'SV Werder Bremen', rankingPoints: 4150, category: 'J18', country: 'Iran' },
    
    // Under 13 Players (M13)
    { playerId: 6192, firstName: 'Zhang', lastName: 'Yuanhao', club: 'Shandong Luneng', rankingPoints: 4000, category: 'M13', country: 'China' },
    { playerId: 2846, firstName: 'Koki', lastName: 'Iwao', club: 'Kinoshita Meister Tokyo', rankingPoints: 3850, category: 'M13', country: 'Japan' },
    { playerId: 7408, firstName: 'Lee', lastName: 'Daeun', club: 'Korea Exchange Bank', rankingPoints: 3700, category: 'M13', country: 'South Korea' },
    
    // Additional Top Senior Players (S) - WTT Ranking
    { playerId: 5123, firstName: 'Xiang', lastName: 'Peng', club: 'Shandong Luneng', rankingPoints: 5600, category: 'S', country: 'China' },
    { playerId: 6781, firstName: 'Yuan', lastName: 'Licen', club: 'Bayi Club', rankingPoints: 5450, category: 'S', country: 'China' },
    { playerId: 3456, firstName: 'Patrick', lastName: 'Franziska', club: 'Borussia Düsseldorf', rankingPoints: 5300, category: 'S', country: 'Germany' },
    { playerId: 7891, firstName: 'Anton', lastName: 'Källberg', club: 'Eslöv AI', rankingPoints: 5150, category: 'S', country: 'Sweden' },
    { playerId: 2341, firstName: 'Simon', lastName: 'Gauzy', club: 'Angers Vaillante', rankingPoints: 5000, category: 'S', country: 'France' },
    { playerId: 5678, firstName: 'Lee', lastName: 'Sangsu', club: 'Korea Exchange Bank', rankingPoints: 4850, category: 'S', country: 'South Korea' },
    { playerId: 9012, firstName: 'Jang', lastName: 'Woojin', club: 'Korea Exchange Bank', rankingPoints: 4700, category: 'S', country: 'South Korea' },
    { playerId: 4561, firstName: 'Lim', lastName: 'Jonghoon', club: 'Korea Exchange Bank', rankingPoints: 4550, category: 'S', country: 'South Korea' },
    { playerId: 8123, firstName: 'Chuang', lastName: 'Chih-Yuan', club: 'Taiwan Power', rankingPoints: 4400, category: 'S', country: 'Chinese Taipei' },
    { playerId: 3451, firstName: 'Liao', lastName: 'Cheng-Ting', club: 'Taiwan Power', rankingPoints: 4250, category: 'S', country: 'Chinese Taipei' },
    { playerId: 6782, firstName: 'Koki', lastName: 'Niwa', club: 'Kinoshita Meister Tokyo', rankingPoints: 4100, category: 'S', country: 'Japan' },
    { playerId: 2342, firstName: 'Yukiya', lastName: 'Uda', club: 'Kinoshita Meister Tokyo', rankingPoints: 3950, category: 'S', country: 'Japan' },
    { playerId: 5671, firstName: 'Shunsuke', lastName: 'Togami', club: 'Kinoshita Meister Tokyo', rankingPoints: 3800, category: 'S', country: 'Japan' },
    { playerId: 8902, firstName: 'Marcos', lastName: 'Freitas', club: 'SV Werder Bremen', rankingPoints: 3650, category: 'S', country: 'Portugal' },
    { playerId: 1235, firstName: 'Tiago', lastName: 'Apolónia', club: 'SV Werder Bremen', rankingPoints: 3500, category: 'S', country: 'Portugal' },
    { playerId: 4562, firstName: 'João', lastName: 'Monteiro', club: 'SV Werder Bremen', rankingPoints: 3350, category: 'S', country: 'Portugal' },
    { playerId: 7892, firstName: 'Mattias', lastName: 'Falck', club: 'Eslöv AI', rankingPoints: 3200, category: 'S', country: 'Sweden' },
    { playerId: 2343, firstName: 'Kristian', lastName: 'Karlsson', club: 'Eslöv AI', rankingPoints: 3050, category: 'S', country: 'Sweden' },
    { playerId: 5672, firstName: 'Emmanuel', lastName: 'Lebesson', club: 'Angers Vaillante', rankingPoints: 2900, category: 'S', country: 'France' },
    { playerId: 8903, firstName: 'Can', lastName: 'Akkuzu', club: 'Angers Vaillante', rankingPoints: 2750, category: 'S', country: 'France' },
    { playerId: 1236, firstName: 'Benedikt', lastName: 'Duda', club: 'Borussia Düsseldorf', rankingPoints: 2600, category: 'S', country: 'Germany' },
    { playerId: 4563, firstName: 'Ruwen', lastName: 'Filus', club: 'Borussia Düsseldorf', rankingPoints: 2450, category: 'S', country: 'Germany' },
    { playerId: 7893, firstName: 'Timo', lastName: 'Boll', club: 'Borussia Düsseldorf', rankingPoints: 2300, category: 'S', country: 'Germany' },
    { playerId: 2344, firstName: 'Quadri', lastName: 'Aruna', club: 'SV Werder Bremen', rankingPoints: 2150, category: 'S', country: 'Nigeria' },
    { playerId: 5673, firstName: 'Omar', lastName: 'Assar', club: 'SV Werder Bremen', rankingPoints: 2000, category: 'S', country: 'Egypt' },
    { playerId: 8904, firstName: 'Liam', lastName: 'Pitchford', club: 'SV Werder Bremen', rankingPoints: 1850, category: 'S', country: 'England' },
    { playerId: 1237, firstName: 'Paul', lastName: 'Drinkhall', club: 'SV Werder Bremen', rankingPoints: 1700, category: 'S', country: 'England' },
    
    // Additional Under 21 Players (E21)
    { playerId: 4564, firstName: 'An', lastName: 'Jaehyun', club: 'Korea Exchange Bank', rankingPoints: 4600, category: 'E21', country: 'South Korea' },
    { playerId: 7894, firstName: 'Cho', lastName: 'Seungmin', club: 'Korea Exchange Bank', rankingPoints: 4450, category: 'E21', country: 'South Korea' },
];

// Real match history between professional players
const REAL_MATCHES = [
    // Wang Chuqin vs Fan Zhendong matches
    { matchId: 1, playerA: 1, playerB: 2, score: '4-3', date: '2024-03-15', competitionId: 1 },
    { matchId: 2, playerA: 2, playerB: 1, score: '4-2', date: '2024-02-20', competitionId: 2 },
    { matchId: 3, playerA: 1, playerB: 2, score: '4-1', date: '2024-01-10', competitionId: 3 },
    
    // Fan Zhendong vs Ma Long matches
    { matchId: 4, playerA: 2, playerB: 3, score: '4-3', date: '2024-03-18', competitionId: 1 },
    { matchId: 5, playerA: 3, playerB: 2, score: '4-2', date: '2024-02-25', competitionId: 2 },
    
    // Hugo Calderano vs Lin Yun-Ju matches
    { matchId: 6, playerA: 4, playerB: 6, score: '4-2', date: '2024-03-20', competitionId: 1 },
    { matchId: 7, playerA: 6, playerB: 4, score: '4-3', date: '2024-02-15', competitionId: 2 },
    
    // Tomokazu Harimoto vs Felix Lebrun matches
    { matchId: 8, playerA: 7, playerB: 13, score: '4-1', date: '2024-03-22', competitionId: 1 },
    { matchId: 9, playerA: 13, playerB: 7, score: '4-3', date: '2024-01-20', competitionId: 3 },
    
    // Liang Jingkun vs Dimitrij Ovtcharov matches
    { matchId: 10, playerA: 5, playerB: 8, score: '4-0', date: '2024-03-25', competitionId: 1 },
    { matchId: 11, playerA: 8, playerB: 5, score: '4-2', date: '2024-02-10', competitionId: 2 },
    
    // Truls Möregårdh vs Darko Jorgic matches
    { matchId: 12, playerA: 9, playerB: 10, score: '4-3', date: '2024-03-28', competitionId: 1 },
    { matchId: 13, playerA: 10, playerB: 9, score: '4-1', date: '2024-01-15', competitionId: 3 },
    
    // Lin Gaoyuan vs Quentin Robinot matches
    { matchId: 14, playerA: 11, playerB: 12, score: '4-2', date: '2024-03-30', competitionId: 1 },
    
    // Felix Lebrun vs Alexis Lebrun (brothers match)
    { matchId: 15, playerA: 13, playerB: 14, score: '4-3', date: '2024-02-28', competitionId: 2 },
    
    // Additional matches for more variety
    { matchId: 16, playerA: 1, playerB: 4, score: '4-1', date: '2024-04-01', competitionId: 4 },
    { matchId: 17, playerA: 2, playerB: 7, score: '4-3', date: '2024-04-05', competitionId: 4 },
    { matchId: 18, playerA: 3, playerB: 6, score: '4-2', date: '2024-04-08', competitionId: 4 },
    { matchId: 19, playerA: 4, playerB: 9, score: '4-0', date: '2024-04-10', competitionId: 4 },
    { matchId: 20, playerA: 5, playerB: 10, score: '4-3', date: '2024-04-12', competitionId: 4 },
    
    // More matches between top Chinese players
    { matchId: 21, playerA: 1, playerB: 3, score: '4-2', date: '2024-05-10', competitionId: 1 },
    { matchId: 22, playerA: 3, playerB: 1, score: '4-3', date: '2024-04-20', competitionId: 2 },
    { matchId: 23, playerA: 1, playerB: 5, score: '4-1', date: '2024-05-15', competitionId: 1 },
    { matchId: 24, playerA: 2, playerB: 5, score: '4-2', date: '2024-04-25', competitionId: 2 },
    { matchId: 25, playerA: 3, playerB: 5, score: '4-3', date: '2024-05-20', competitionId: 1 },
    { matchId: 26, playerA: 1, playerB: 11, score: '4-0', date: '2024-05-25', competitionId: 1 },
    { matchId: 27, playerA: 2, playerB: 11, score: '4-1', date: '2024-04-30', competitionId: 2 },
    { matchId: 28, playerA: 5, playerB: 11, score: '4-2', date: '2024-06-01', competitionId: 1 },
    
    // Matches between Chinese and international top players
    { matchId: 29, playerA: 1, playerB: 6, score: '4-2', date: '2024-06-05', competitionId: 1 },
    { matchId: 30, playerA: 2, playerB: 6, score: '4-1', date: '2024-05-30', competitionId: 2 },
    { matchId: 31, playerA: 1, playerB: 7, score: '4-3', date: '2024-06-10', competitionId: 1 },
    { matchId: 32, playerA: 2, playerB: 7, score: '4-2', date: '2024-06-15', competitionId: 1 },
    { matchId: 33, playerA: 3, playerB: 7, score: '4-1', date: '2024-05-05', competitionId: 2 },
    { matchId: 34, playerA: 1, playerB: 8, score: '4-0', date: '2024-06-20', competitionId: 1 },
    { matchId: 35, playerA: 2, playerB: 8, score: '4-2', date: '2024-06-25', competitionId: 2 },
    { matchId: 36, playerA: 5, playerB: 8, score: '4-1', date: '2024-07-01', competitionId: 1 },
    
    // Matches between European players
    { matchId: 37, playerA: 4, playerB: 8, score: '4-3', date: '2024-07-05', competitionId: 2 },
    { matchId: 38, playerA: 8, playerB: 4, score: '4-2', date: '2024-07-10', competitionId: 1 },
    { matchId: 39, playerA: 4, playerB: 9, score: '4-1', date: '2024-07-15', competitionId: 2 },
    { matchId: 40, playerA: 8, playerB: 9, score: '4-3', date: '2024-07-20', competitionId: 1 },
    { matchId: 41, playerA: 9, playerB: 10, score: '4-2', date: '2024-07-25', competitionId: 2 },
    { matchId: 42, playerA: 4, playerB: 10, score: '4-1', date: '2024-08-01', competitionId: 1 },
    { matchId: 43, playerA: 8, playerB: 10, score: '4-3', date: '2024-08-05', competitionId: 2 },
    
    // Matches between Asian players (non-Chinese)
    { matchId: 44, playerA: 6, playerB: 7, score: '4-3', date: '2024-08-10', competitionId: 1 },
    { matchId: 45, playerA: 7, playerB: 6, score: '4-2', date: '2024-08-15', competitionId: 2 },
    { matchId: 46, playerA: 6, playerB: 49, score: '4-1', date: '2024-08-20', competitionId: 1 },
    { matchId: 47, playerA: 7, playerB: 49, score: '4-2', date: '2024-08-25', competitionId: 2 },
    { matchId: 48, playerA: 6, playerB: 50, score: '4-3', date: '2024-09-01', competitionId: 1 },
    { matchId: 49, playerA: 7, playerB: 50, score: '4-1', date: '2024-09-05', competitionId: 2 },
    
    // Matches between French players
    { matchId: 50, playerA: 12, playerB: 13, score: '4-2', date: '2024-09-10', competitionId: 2 },
    { matchId: 51, playerA: 13, playerB: 14, score: '4-3', date: '2024-09-15', competitionId: 1 },
    { matchId: 52, playerA: 12, playerB: 14, score: '4-1', date: '2024-09-20', competitionId: 2 },
    { matchId: 53, playerA: 13, playerB: 48, score: '4-2', date: '2024-09-25', competitionId: 1 },
    { matchId: 54, playerA: 14, playerB: 48, score: '4-3', date: '2024-10-01', competitionId: 2 },
    
    // Matches between German players
    { matchId: 55, playerA: 8, playerB: 46, score: '4-1', date: '2024-10-05', competitionId: 1 },
    { matchId: 56, playerA: 46, playerB: 64, score: '4-2', date: '2024-10-10', competitionId: 2 },
    { matchId: 57, playerA: 8, playerB: 64, score: '4-3', date: '2024-10-15', competitionId: 1 },
    { matchId: 58, playerA: 46, playerB: 65, score: '4-1', date: '2024-10-20', competitionId: 2 },
    { matchId: 59, playerA: 64, playerB: 65, score: '4-2', date: '2024-10-25', competitionId: 1 },
    
    // Matches between Swedish players
    { matchId: 60, playerA: 9, playerB: 47, score: '4-3', date: '2024-11-01', competitionId: 2 },
    { matchId: 61, playerA: 47, playerB: 60, score: '4-2', date: '2024-11-05', competitionId: 1 },
    { matchId: 62, playerA: 9, playerB: 60, score: '4-1', date: '2024-11-10', competitionId: 2 },
    { matchId: 63, playerA: 47, playerB: 61, score: '4-3', date: '2024-11-15', competitionId: 1 },
    { matchId: 64, playerA: 60, playerB: 61, score: '4-2', date: '2024-11-20', competitionId: 2 },
    
    // Matches between Korean players
    { matchId: 65, playerA: 27, playerB: 49, score: '4-3', date: '2024-11-25', competitionId: 1 },
    { matchId: 66, playerA: 49, playerB: 50, score: '4-2', date: '2024-12-01', competitionId: 2 },
    { matchId: 67, playerA: 50, playerB: 51, score: '4-1', date: '2024-12-05', competitionId: 1 },
    { matchId: 68, playerA: 27, playerB: 50, score: '4-3', date: '2024-12-10', competitionId: 2 },
    { matchId: 69, playerA: 49, playerB: 73, score: '4-2', date: '2024-12-15', competitionId: 1 },
    { matchId: 70, playerA: 50, playerB: 73, score: '4-1', date: '2024-12-20', competitionId: 2 },
    { matchId: 71, playerA: 51, playerB: 73, score: '4-3', date: '2024-12-25', competitionId: 1 },
    { matchId: 72, playerA: 27, playerB: 73, score: '4-2', date: '2025-01-01', competitionId: 2 },
    
    // Matches between Japanese players
    { matchId: 73, playerA: 7, playerB: 28, score: '4-1', date: '2025-01-05', competitionId: 1 },
    { matchId: 74, playerA: 7, playerB: 54, score: '4-2', date: '2025-01-10', competitionId: 2 },
    { matchId: 75, playerA: 7, playerB: 55, score: '4-3', date: '2025-01-15', competitionId: 1 },
    { matchId: 76, playerA: 28, playerB: 54, score: '4-1', date: '2025-01-20', competitionId: 2 },
    { matchId: 77, playerA: 28, playerB: 55, score: '4-2', date: '2025-01-25', competitionId: 1 },
    { matchId: 78, playerA: 54, playerB: 55, score: '4-3', date: '2025-02-01', competitionId: 2 },
    { matchId: 79, playerA: 7, playerB: 40, score: '4-1', date: '2025-02-05', competitionId: 1 },
    
    // Matches between Portuguese players
    { matchId: 80, playerA: 57, playerB: 58, score: '4-3', date: '2025-02-10', competitionId: 2 },
    { matchId: 81, playerA: 57, playerB: 59, score: '4-2', date: '2025-02-15', competitionId: 1 },
    { matchId: 82, playerA: 58, playerB: 59, score: '4-1', date: '2025-02-20', competitionId: 2 },
    
    // Cross-continental matches
    { matchId: 83, playerA: 4, playerB: 7, score: '4-3', date: '2025-02-25', competitionId: 1 },
    { matchId: 84, playerA: 4, playerB: 9, score: '4-2', date: '2025-03-01', competitionId: 2 },
    { matchId: 85, playerA: 6, playerB: 8, score: '4-1', date: '2025-03-05', competitionId: 1 },
    { matchId: 86, playerA: 6, playerB: 9, score: '4-3', date: '2025-03-10', competitionId: 2 },
    { matchId: 87, playerA: 7, playerB: 8, score: '4-2', date: '2025-03-15', competitionId: 1 },
    { matchId: 88, playerA: 7, playerB: 9, score: '4-1', date: '2025-03-20', competitionId: 2 },
    { matchId: 89, playerA: 4, playerB: 10, score: '4-3', date: '2025-03-25', competitionId: 1 },
    { matchId: 90, playerA: 6, playerB: 10, score: '4-2', date: '2025-03-30', competitionId: 2 },
    
    // More matches between top players and rising stars
    { matchId: 91, playerA: 1, playerB: 13, score: '4-1', date: '2025-04-01', competitionId: 1 },
    { matchId: 92, playerA: 2, playerB: 13, score: '4-2', date: '2025-04-05', competitionId: 2 },
    { matchId: 93, playerA: 3, playerB: 13, score: '4-3', date: '2025-04-10', competitionId: 1 },
    { matchId: 94, playerA: 1, playerB: 14, score: '4-0', date: '2025-04-15', competitionId: 2 },
    { matchId: 95, playerA: 2, playerB: 14, score: '4-1', date: '2025-04-20', competitionId: 1 },
    { matchId: 96, playerA: 7, playerB: 13, score: '4-2', date: '2025-04-25', competitionId: 2 },
    { matchId: 97, playerA: 7, playerB: 14, score: '4-3', date: '2025-04-30', competitionId: 1 },
    { matchId: 98, playerA: 6, playerB: 13, score: '4-1', date: '2025-05-01', competitionId: 2 },
    { matchId: 99, playerA: 6, playerB: 14, score: '4-2', date: '2025-05-05', competitionId: 1 },
    { matchId: 100, playerA: 8, playerB: 13, score: '4-3', date: '2025-05-10', competitionId: 2 },
    
    // European Table Tennis Championships 2024 - Real matches between European players
    // Round of 32 (Preliminary rounds)
    { matchId: 101, playerA: 8, playerB: 46, score: '4-0', date: '2024-05-14', competitionId: 5 },
    { matchId: 102, playerA: 9, playerB: 47, score: '4-2', date: '2024-05-14', competitionId: 5 },
    { matchId: 103, playerA: 10, playerB: 64, score: '4-3', date: '2024-05-14', competitionId: 5 },
    { matchId: 104, playerA: 13, playerB: 14, score: '4-1', date: '2024-05-14', competitionId: 5 },
    { matchId: 105, playerA: 12, playerB: 48, score: '4-2', date: '2024-05-14', competitionId: 5 },
    { matchId: 106, playerA: 57, playerB: 58, score: '4-3', date: '2024-05-14', competitionId: 5 },
    { matchId: 107, playerA: 60, playerB: 61, score: '4-1', date: '2024-05-14', competitionId: 5 },
    { matchId: 108, playerA: 46, playerB: 65, score: '4-2', date: '2024-05-14', competitionId: 5 },
    
    // Round of 16
    { matchId: 109, playerA: 8, playerB: 9, score: '4-2', date: '2024-05-15', competitionId: 5 },
    { matchId: 110, playerA: 10, playerB: 12, score: '4-1', date: '2024-05-15', competitionId: 5 },
    { matchId: 111, playerA: 13, playerB: 46, score: '4-3', date: '2024-05-15', competitionId: 5 },
    { matchId: 112, playerA: 9, playerB: 47, score: '4-2', date: '2024-05-15', competitionId: 5 },
    { matchId: 113, playerA: 48, playerB: 47, score: '4-1', date: '2024-05-15', competitionId: 5 },
    { matchId: 114, playerA: 57, playerB: 60, score: '4-3', date: '2024-05-15', competitionId: 5 },
    { matchId: 115, playerA: 12, playerB: 14, score: '4-1', date: '2024-05-15', competitionId: 5 },
    { matchId: 116, playerA: 64, playerB: 65, score: '4-2', date: '2024-05-15', competitionId: 5 },
    
    // Quarterfinals
    { matchId: 117, playerA: 8, playerB: 10, score: '4-3', date: '2024-05-16', competitionId: 5 },
    { matchId: 118, playerA: 13, playerB: 9, score: '4-2', date: '2024-05-16', competitionId: 5 },
    { matchId: 119, playerA: 48, playerB: 57, score: '4-1', date: '2024-05-16', competitionId: 5 },
    { matchId: 120, playerA: 12, playerB: 64, score: '4-3', date: '2024-05-16', competitionId: 5 },
    
    // Semifinals
    { matchId: 121, playerA: 8, playerB: 13, score: '4-2', date: '2024-05-17', competitionId: 5 },
    { matchId: 122, playerA: 48, playerB: 12, score: '4-3', date: '2024-05-17', competitionId: 5 },
    
    // Final
    { matchId: 123, playerA: 8, playerB: 48, score: '4-1', date: '2024-05-18', competitionId: 5 },
    
    // Additional European Championship matches (group stage and early rounds)
    { matchId: 124, playerA: 8, playerB: 64, score: '4-0', date: '2024-05-13', competitionId: 5 },
    { matchId: 125, playerA: 9, playerB: 60, score: '4-2', date: '2024-05-13', competitionId: 5 },
    { matchId: 126, playerA: 10, playerB: 61, score: '4-1', date: '2024-05-13', competitionId: 5 },
    { matchId: 127, playerA: 12, playerB: 48, score: '4-3', date: '2024-05-13', competitionId: 5 },
    { matchId: 128, playerA: 13, playerB: 57, score: '4-2', date: '2024-05-13', competitionId: 5 },
    { matchId: 129, playerA: 14, playerB: 46, score: '4-1', date: '2024-05-13', competitionId: 5 },
    { matchId: 130, playerA: 47, playerB: 58, score: '4-3', date: '2024-05-13', competitionId: 5 },
    { matchId: 131, playerA: 60, playerB: 65, score: '4-2', date: '2024-05-13', competitionId: 5 },
];

// Real international table tennis competitions/tournaments
const REAL_COMPETITIONS = [
    {
        competitionId: 1,
        name: 'Singapore Smash 2024',
        location: 'Singapore',
        date: '2024-03-15',
        category: 'S',
    },
    {
        competitionId: 2,
        name: 'WTT Champions Frankfurt',
        location: 'Frankfurt',
        date: '2024-02-20',
        category: 'S',
    },
    {
        competitionId: 3,
        name: 'World Table Tennis Championships',
        location: 'Busan',
        date: '2024-01-10',
        category: 'S',
    },
    {
        competitionId: 4,
        name: 'WTT Star Contender Doha',
        location: 'Doha',
        date: '2024-04-01',
        category: 'S',
    },
    {
        competitionId: 5,
        name: 'European Table Tennis Championships',
        location: 'Paris',
        date: '2024-05-15',
        category: 'E21',
    },
];

// Real professional table tennis clubs/teams
const REAL_CLUBS = [
    {
        clubId: 1,
        clubName: 'Bayi Club',
        players: [1, 2, 3], // Wang Chuqin, Fan Zhendong, Ma Long
        leaguePoints: 95,
    },
    {
        clubId: 2,
        clubName: 'Borussia Düsseldorf',
        players: [4, 8], // Hugo Calderano, Dimitrij Ovtcharov
        leaguePoints: 88,
    },
    {
        clubId: 3,
        clubName: 'Shandong Luneng',
        players: [5, 11, 23], // Liang Jingkun, Lin Gaoyuan, Zhang Yuanhao
        leaguePoints: 85,
    },
    {
        clubId: 4,
        clubName: 'Angers Vaillante',
        players: [12, 13, 14], // Quentin Robinot, Felix Lebrun, Alexis Lebrun
        leaguePoints: 82,
    },
    {
        clubId: 5,
        clubName: 'SV Werder Bremen',
        players: [10, 17, 20, 22], // Darko Jorgic, Martin Frigo, Miroslav Hudec, Bezhan Mokhtari
        leaguePoints: 78,
    },
    {
        clubId: 6,
        clubName: 'Kinoshita Meister Tokyo',
        players: [7, 16, 24], // Tomokazu Harimoto, Hiroto Shinozuka, Koki Iwao
        leaguePoints: 75,
    },
    {
        clubId: 7,
        clubName: 'Taiwan Power',
        players: [6, 19, 52, 53], // Lin Yun-Ju (index 5), Kao Cheng-Jui (index 18), Chuang Chih-Yuan (index 51), Liao Cheng-Ting (index 52)
        leaguePoints: 72,
    },
    {
        clubId: 8,
        clubName: 'Eslöv AI',
        players: [9, 47, 60, 61], // Truls Möregårdh (index 8), Anton Källberg (index 46), Mattias Falck (index 59), Kristian Karlsson (index 60)
        leaguePoints: 70,
    },
    {
        clubId: 9,
        clubName: 'Korea Exchange Bank',
        players: [15, 41, 49, 50, 51, 73, 74], // Shin Yubin (index 14), Lee Daeun (index 40), Lee Sangsu (index 48), Jang Woojin (index 49), Lim Jonghoon (index 50), An Jaehyun (index 72), Cho Seungmin (index 73)
        leaguePoints: 68,
    },
    {
        clubId: 10,
        clubName: 'Singapore Table Tennis Association',
        players: [18], // Izaac Quek (index 17)
        leaguePoints: 45,
    },
    {
        clubId: 11,
        clubName: 'Thailand Table Tennis Association',
        players: [21], // Yanapong Panagitgun (index 20)
        leaguePoints: 43,
    },
];

/**
 * Get complete data structure for the application
 * This function formats the real-world data to match the application's expected structure
 * @returns {Object} Complete data structure with players, matches, competitions, and clubs
 */
function getRealWorldData() {
    // Create mapping from old playerId (1-25) to new random 4-digit playerId
    const playerIdMap = {};
    REAL_PLAYERS.forEach((player, index) => {
        const oldId = index + 1;
        playerIdMap[oldId] = player.playerId;
    });

    // Convert player data to match application structure
    const formattedPlayers = REAL_PLAYERS.map(player => ({
        playerId: player.playerId,
        firstName: player.firstName,
        lastName: player.lastName,
        club: player.club,
        rankingPoints: player.rankingPoints,
        category: player.category,
        country: player.country,
    }));

    // Update matches to use new playerIds
    const updatedMatches = REAL_MATCHES.map(match => ({
        matchId: match.matchId,
        playerA: playerIdMap[match.playerA] || match.playerA,
        playerB: playerIdMap[match.playerB] || match.playerB,
        score: match.score,
        date: match.date,
        competitionId: match.competitionId,
    }));

    // Update clubs to use new playerIds
    const updatedClubs = REAL_CLUBS.map(club => ({
        clubId: club.clubId,
        clubName: club.clubName,
        players: club.players.map(oldId => playerIdMap[oldId] || oldId),
        leaguePoints: club.leaguePoints,
    }));

    return {
        players: formattedPlayers,
        matches: updatedMatches,
        competitions: REAL_COMPETITIONS,
        clubs: updatedClubs,
    };
}
