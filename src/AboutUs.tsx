import React from "react";
import {
  Heart,
  Eye,
  Target,
  Award,
  Shield,
  Users,
  TrendingUp,
  Globe,
  Star,
  CheckCircle,
  Calendar,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const AboutUs = ({
  setShowAboutUs,
}: {
  setShowAboutUs: (value: boolean) => void;
}) => {
  const stats = [
    { number: "15+", label: "Years Experience", icon: Calendar },
    { number: "10K+", label: "Cattle Sold", icon: TrendingUp },
    { number: "500+", label: "Happy Clients", icon: Users },
    { number: "25+", label: "Countries Served", icon: Globe },
  ];

  const values = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description:
        "Every cattle we trade meets the highest standards of health, genetics, and breeding quality.",
    },
    {
      icon: Heart,
      title: "Ethical Trading",
      description:
        "We ensure humane treatment and ethical practices throughout our entire supply chain.",
    },
    {
      icon: Users,
      title: "Customer First",
      description:
        "Our clients success is our priority. We provide personalized service and ongoing support.",
    },
    {
      icon: Award,
      title: "Expert Knowledge",
      description:
        "Decades of experience in livestock trading, breeding, and agricultural business.",
    },
  ];

  const team = [
    {
      name: "John Mitchell",
      position: "Founder & CEO",
      experience: "20+ years in livestock trading",
      image: "👨‍🌾",
      bio: "Started as a ranch hand, built the company from ground up with passion for quality cattle.",
    },
    {
      name: "Sarah Johnson",
      position: "Head of Operations",
      experience: "15+ years in agricultural business",
      image: "👩‍💼",
      bio: "Ensures smooth operations and maintains our high standards across all transactions.",
    },
    {
      name: "Dr. Michael Chen",
      position: "Chief Veterinarian",
      experience: "18+ years in livestock health",
      image: "👨‍⚕️",
      bio: "Oversees health certifications and ensures all cattle meet strict health requirements.",
    },
    {
      name: "Emma Rodriguez",
      position: "International Sales Director",
      experience: "12+ years in global trade",
      image: "👩‍💻",
      bio: "Manages international partnerships and expansion into new markets worldwide.",
    },
  ];

  const milestones = [
    {
      year: "2009",
      event: "CattleMart founded with a vision to revolutionize cattle trading",
    },
    { year: "2012", event: "Reached 1,000+ successful cattle transactions" },
    {
      year: "2015",
      event: "Expanded to international markets, serving 10+ countries",
    },
    {
      year: "2018",
      event: "Launched digital platform for online cattle trading",
    },
    { year: "2021", event: "Achieved 10,000+ cattle sold milestone" },
    {
      year: "2024",
      event: "Now serving 25+ countries with 500+ satisfied clients",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <button
        onClick={() => setShowAboutUs(false)}
        className="fixed top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-200 z-10"
      >
        Back to Home
      </button>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            About CattleMart
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
            Connecting ranchers, traders, and buyers worldwide with premium
            quality cattle since 2009
          </p>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg mb-3">
                  <stat.icon size={24} />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.number}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  Founded in 2009 by John Mitchell, a third-generation rancher,
                  CattleMart began with a simple vision: to create a
                  transparent, reliable marketplace where cattle buyers and
                  sellers could connect with confidence.
                </p>
                <p className="mb-4">
                  What started as a local cattle trading business in Texas has
                  grown into an international platform serving ranchers,
                  feedlots, and processors across 25+ countries. We've
                  facilitated over 10,000 cattle transactions, building lasting
                  relationships based on trust, quality, and integrity.
                </p>
                <p>
                  Today, we combine traditional ranching wisdom with modern
                  technology to provide the most comprehensive cattle trading
                  experience in the industry.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8 text-center">
                <div className="text-8xl mb-4">🐄</div>
                <div className="text-6xl mb-4">🤝</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Trusted Partnership
                </h3>
                <p className="text-gray-600">
                  Building bridges between cattle producers and buyers worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Mission */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <Target className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To revolutionize the cattle trading industry by providing a
                transparent, efficient, and trustworthy platform that connects
                cattle producers with buyers globally, while ensuring the
                highest standards of animal welfare and business ethics.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  <Eye className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become the world's leading cattle trading platform, fostering
                sustainable agriculture, supporting rural communities, and
                feeding the world through responsible livestock commerce that
                benefits all stakeholders in the supply chain.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div>
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Our Core Values
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="text-white" size={28} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced team combines decades of livestock expertise with
              modern business acumen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h4>
                  <p className="text-blue-600 font-medium mb-2">
                    {member.position}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    {member.experience}
                  </p>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Our Journey
            </h3>
            <p className="text-xl text-gray-600">
              Key milestones that shaped our company
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-green-500 rounded-full"></div>

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`flex items-center mb-8 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                  }`}
                >
                  <div className="bg-white border-2 border-blue-200 rounded-xl p-6 shadow-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {milestone.year}
                    </div>
                    <p className="text-gray-700">{milestone.event}</p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Why Choose CattleMart?</h3>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              We're more than just a cattle trading platform – we're your
              trusted partners in livestock commerce
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                title: "Verified Quality",
                description:
                  "Every cattle goes through rigorous health and quality checks by certified veterinarians.",
              },
              {
                icon: Shield,
                title: "Secure Transactions",
                description:
                  "Protected payments and guaranteed livestock delivery with full insurance coverage.",
              },
              {
                icon: Star,
                title: "24/7 Support",
                description:
                  "Round-the-clock customer support from our livestock experts whenever you need help.",
              },
              {
                icon: Globe,
                title: "Global Reach",
                description:
                  "Access to cattle markets worldwide with seamless international shipping coordination.",
              },
              {
                icon: TrendingUp,
                title: "Market Insights",
                description:
                  "Real-time market data and pricing trends to help you make informed decisions.",
              },
              {
                icon: Users,
                title: "Trusted Network",
                description:
                  "Connect with verified ranchers, feedlots, and buyers from our extensive network.",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={28} />
                </div>
                <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                <p className="opacity-80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Work With Us?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied clients who trust CattleMart for their
            livestock trading needs
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2">
              <span>Browse Cattle</span>
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2">
              <span>Contact Us</span>
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-sm opacity-80">
            <div className="flex items-center space-x-2">
              <Phone size={16} />
              <span>(+025) 3886 25 16</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={16} />
              <span>hello@cattlemart.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <span>Manhattan, NY, US</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
