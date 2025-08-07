# 🚀 DevQuest - The Ultimate Developer Roadmap & Resource Explorer

DevQuest is a modern, interactive platform designed for developers of all levels to navigate their learning journey. Whether you're mastering Frontend, Backend, DevOps, AI/ML, or exploring niche technologies, DevQuest provides structured roadmaps, curated resources, and a gamified learning experience.

## ✨ Features

### 🗺️ Interactive Tech Roadmaps
- Visual learning paths for Frontend, Backend, DevOps, AI/ML, and more
- Progress tracking with detailed analytics
- Customizable learning paths

### 🎯 Daily Quests & Gamification
- Auto-generated daily challenges based on your roadmap
- Streak tracking and XP system
- Achievement badges and leaderboards

### 📚 Resource Curation
- Hand-picked tutorials, articles, and courses
- Community-driven resource sharing
- Smart filtering and search capabilities

### 👥 Community Learning
- Study groups by topic/roadmap
- Collaborative learning features
- Help fellow developers and earn rewards

### 📊 Progress Dashboard
- Detailed learning analytics
- Roadmap completion tracking
- Performance insights

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/devquest-platform.git
   cd devquest-platform
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key
   - Copy `.env.example` to `.env.local` and fill in your Supabase credentials:
   
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   \`\`\`

4. **Set up the database**
   - In your Supabase dashboard, go to the SQL Editor
   - Run the SQL script from `scripts/setup-database.sql`
   - This will create all necessary tables and security policies

5. **Configure Authentication**
   - In Supabase dashboard, go to Authentication > Settings
   - Add your site URL: `http://localhost:3000`
   - Enable GitHub OAuth (optional):
     - Go to Authentication > Providers
     - Enable GitHub and add your GitHub OAuth app credentials

6. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

7. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Create an account and start your DevQuest journey!

## 📁 Project Structure

\`\`\`
devquest-platform/
├── app/                    # Next.js 14 App Router
│   ├── auth/              # Authentication routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── auth-modal.tsx    # Authentication modal
│   ├── dashboard.tsx     # Main dashboard
│   ├── landing-page.tsx  # Landing page
│   ├── quest-system.tsx  # Daily quests
│   ├── roadmap-view.tsx  # Roadmap visualization
│   └── resource-library.tsx # Resource management
├── scripts/              # Database setup scripts
├── types/                # TypeScript type definitions
└── README.md
\`\`\`

## 🎮 How to Use

### 1. **Sign Up/Login**
   - Create an account using email or GitHub OAuth
   - Complete your profile setup

### 2. **Choose Your Path**
   - Browse available roadmaps (Frontend, Backend, DevOps, AI/ML)
   - Start with beginner-friendly paths or jump to advanced topics

### 3. **Complete Daily Quests**
   - Check your daily quests for personalized challenges
   - Earn XP and maintain your learning streak
   - Unlock achievements and badges

### 4. **Explore Resources**
   - Browse curated learning materials
   - Bookmark resources for later
   - Filter by difficulty, type, and category

### 5. **Join the Community**
   - Participate in study groups
   - Share resources and tips
   - Climb the leaderboards

## 🔧 Customization

### Adding New Roadmaps
1. Edit `components/roadmap-view.tsx`
2. Add your roadmap data to the `roadmaps` array
3. Include topics, resources, and progress tracking

### Modifying Quest Types
1. Update `components/quest-system.tsx`
2. Add new quest categories and difficulty levels
3. Implement custom XP rewards

### Styling Changes
1. Modify `app/globals.css` for global styles
2. Update Tailwind classes in components
3. Customize the color scheme in CSS variables

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables from your `.env.local`

3. **Update Supabase Settings**
   - Add your Vercel domain to Supabase Auth settings
   - Update redirect URLs for OAuth providers

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Lucide](https://lucide.dev/) for the icon library
- The developer community for inspiration and feedback

## 📞 Support

- 📧 Email: support@devquest.dev
- 💬 Discord: [Join our community](https://discord.gg/devquest)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/devquest-platform/issues)

---

**Happy Learning! 🚀**

Start your developer journey today with DevQuest - where learning meets adventure!
