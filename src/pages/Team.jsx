import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";
import { 
  Users, 
  Award, 
  Target, 
  Heart,
  Mail,
  Linkedin,
  Twitter,
  ArrowRight,
  Star,
  Calendar,
  Globe,
  Sparkles,
  MessageCircle,
  Trophy,
  Lightbulb
} from "lucide-react";

export default function Team() {
  const team = [
    { 
      name: "Aarav Sharma", 
      role: "President", 
      img: "https://via.placeholder.com/200",
      bio: "Visionary leader with 5+ years in youth development. Passionate about creating opportunities for young changemakers across Nepal.",
      email: "aarav@ytschitwan.org",
      linkedin: "#",
      twitter: "#",
      achievements: ["Led 15+ major events", "CMUN Founder", "Youth Ambassador"],
      joinedYear: "2019"
    },
    { 
      name: "Sneha Koirala", 
      role: "Vice President", 
      img: "https://via.placeholder.com/200",
      bio: "Strategic planner and community builder. Dedicated to empowering female youth leadership and inclusive growth initiatives.",
      email: "sneha@ytschitwan.org",
      linkedin: "#",
      twitter: "#",
      achievements: ["Women's Leadership Advocate", "50+ Workshops Organized", "Community Impact Award"],
      joinedYear: "2020"
    },
    { 
      name: "Rohan Gurung", 
      role: "Event Coordinator", 
      img: "https://via.placeholder.com/200",
      bio: "Master event organizer with exceptional attention to detail. Transforms ideas into impactful experiences that inspire action.",
      email: "rohan@ytschitwan.org",
      linkedin: "#",
      twitter: "#",
      achievements: ["Event Excellence Award", "Innovation Hackathon Creator", "500+ Participants Managed"],
      joinedYear: "2021"
    },
    { 
      name: "Priya Adhikari", 
      role: "PR Manager", 
      img: "https://via.placeholder.com/200",
      bio: "Creative storyteller and brand strategist. Amplifies YTS Chitwan's mission through compelling narratives and digital engagement.",
      email: "priya@ytschitwan.org",
      linkedin: "#",
      twitter: "#",
      achievements: ["Digital Strategy Expert", "Media Partnership Builder", "Brand Recognition Leader"],
      joinedYear: "2022"
    },
  ];

  const teamStats = [
    { number: "4", label: "Core Leaders", icon: Users },
    { number: "15+", label: "Team Members", icon: Globe },
    { number: "8", label: "Years Experience", icon: Calendar },
    { number: "25+", label: "Awards Won", icon: Trophy },
  ];

  const values = [
    {
      icon: Target,
      title: "Vision-Driven Leadership",
      description: "We lead with clear purpose and unwavering commitment to youth empowerment."
    },
    {
      icon: Heart,
      title: "Passion for Impact",
      description: "Every team member brings genuine passion for creating positive social change."
    },
    {
      icon: Lightbulb,
      title: "Innovation & Creativity",
      description: "We embrace new ideas and innovative approaches to solve complex challenges."
    },
    {
      icon: Users,
      title: "Collaborative Spirit",
      description: "Our strength lies in our ability to work together toward common goals."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-center bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='30,0 60,30 30,60 0,30'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-4 h-4 bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-32 right-24 w-6 h-6 bg-pink-400 rounded-full opacity-40 animate-bounce"></div>
          <div className="absolute bottom-32 left-32 w-3 h-3 bg-green-400 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute bottom-40 right-20 w-5 h-5 bg-blue-400 rounded-full opacity-30 animate-bounce"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 max-w-4xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-sm font-medium">Meet the Changemakers</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Our Leadership
              <span className="block text-3xl md:text-4xl text-yellow-400 mt-2">
                Team
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Passionate leaders driving Nepal's youth empowerment movement through 
              <span className="text-yellow-300 font-semibold"> innovation</span>, 
              <span className="text-green-300 font-semibold"> dedication</span>, and 
              <span className="text-pink-300 font-semibold"> collaborative spirit</span>.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex items-center justify-center">
              <div className="flex items-center text-yellow-300">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
                <span className="ml-2 text-blue-200">Recognized Excellence</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-16 px-6 bg-white dark:bg-gray-800 relative">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Leadership Excellence
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Our team's collective impact and achievements
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {teamStats.map((stat, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mb-4 group-hover:shadow-lg">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Meet Our Leaders
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                The passionate individuals driving positive change across Nepal
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <Reveal key={index} delay={index * 0.2}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:transform hover:scale-105">
                  {/* Member Image & Basic Info */}
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="relative">
                        <img 
                          src={member.img} 
                          alt={member.name}
                          className="w-20 h-20 rounded-full object-cover border-4 border-gradient-to-br from-purple-500 to-blue-600"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="ml-6 flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                          {member.name}
                        </h3>
                        <div className="flex items-center mb-2">
                          <Award className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
                          <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                            {member.role}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Team Member Since {member.joinedYear}
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                        <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                        Key Achievements
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.achievements.map((achievement, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full font-medium"
                          >
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contact & Social */}
                    <div className="flex items-center justify-between pt-6 border-t dark:border-gray-700">
                      <div className="flex space-x-3">
                        <a 
                          href={`mailto:${member.email}`}
                          className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors group"
                          title="Email"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                        <a 
                          href={member.linkedin}
                          className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                          title="LinkedIn"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                        <a 
                          href={member.twitter}
                          className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors"
                          title="Twitter"
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                      </div>
                      <button className="flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors group">
                        <MessageCircle className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" />
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-16 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Our Leadership Values
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                The core principles that guide our team's approach to youth empowerment and social change
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-full mb-6 group-hover:shadow-lg">
                    <value.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want to Join Our Team?
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
              We're always looking for passionate individuals who want to make a difference in Nepal's youth community. 
              Join us in creating positive change!
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg group"
              >
                Apply to Join
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/about"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors"
              >
                Learn About Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
