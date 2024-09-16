export type MemberInfo = {
  avatar: string;
  email: string;
  name: string;
};

export type Users = {
  id: number;
  memberInfo: MemberInfo;
  role: string;
  workerType: 'Contractor' | 'Employee';
  status: 'Active' | 'Inactive' | 'Paused' | 'Vacation';
  startDate: Date;
};

const names = [
  'Eddard Stark',
  'Daenerys Targaryen',
  'Jon Snow',
  'Arya Stark',
  'Tyrion Lannister',
  'Cersei Lannister',
  'Brienne of Tarth',
  'Jorah Mormont',
  'Sansa Stark',
  'Jaime Lannister',
  'Khal Drogo',
  'Melisandre of Asshai',
  'Samwell Tarly',
  'Bran Stark',
  'Ygritte Wildling',
  'Theon Greyjoy',
  'Oberyn Martell',
  'Varys the Spider',
  'Margaery Tyrell',
  'Petyr Baelish',
  'Sandor Clegane',
  'Joffrey Baratheon',
  'Davos Seaworth',
  'Ellaria Sand',
  'Gendry Waters',
  'Tormund Giantsbane',
  'Ramsay Bolton',
  'Robb Stark',
  'Daario Naharis',
  'Missandei of Naath',
];

const roles = [
  'Software Engineer',
  'Data Analyst',
  'Project Manager',
  'Network Administrator',
  'Quality Assurance Tester',
  'Business Analyst',
  'UX/UI Designer',
  'Web Developer',
  'Technical Support Specialist',
  'DevOps Engineer',
  'Cloud Architect',
  'IT Security Specialist',
  'Database Administrator',
  'Systems Analyst',
  'IT Support Technician',
  'Cybersecurity Analyst',
  'Front-End Developer',
  'Back-End Developer',
  'Full Stack Developer',
  'Machine Learning Engineer',
  'Data Scientist',
  'IT Manager',
  'Systems Engineer',
  'Information Security Analyst',
  'IT Consultant',
  'Solutions Architect',
  'Infrastructure Engineer',
  'Application Support Analyst',
  'Network Engineer',
  'Artificial Intelligence Engineer',
];

const generateMockUserData = (count: number): Users[] => {
  const mockData: Users[] = [];

  for (let i = 0; i < count; i++) {
    const selectedName = names[Math.floor(Math.random() * names.length)];
    const selectedRole = roles[Math.floor(Math.random() * roles.length)];

    const user: Users = {
      id: i + 1,
      memberInfo: {
        avatar: `https://randomuser.me/api/portraits/thumb/men/${i}.jpg`,
        email: `${selectedName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        name: selectedName,
      },
      role: selectedRole,
      workerType: Math.random() > 0.5 ? 'Contractor' : 'Employee',
      status:
        Math.random() > 0.5
          ? 'Active'
          : Math.random() > 0.5
          ? 'Paused'
          : Math.random() > 0.5
          ? 'Vacation'
          : 'Inactive',
      startDate: new Date(
        new Date().getTime() - Math.random() * (24 * 60 * 60 * 1000 * 40)
      ),
    };

    mockData.push(user);
  }

  return mockData;
};

export const users: Users[] = generateMockUserData(100);

export default users;
