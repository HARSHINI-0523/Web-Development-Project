import React, { useState, useRef, useEffect } from "react";
import "./Resources.css"; // Import CSS for styling
import { FaFilter } from "react-icons/fa"; // Import filter icon
import image1 from '../../assets/images/image1.jpeg'
import image2 from '../../assets/images/image2.jpeg'
import image3 from '../../assets/images/image3.jpeg'
import image4 from '../../assets/images/image4.jpeg'
import image5 from '../../assets/images/image5.jpeg'
import image6 from '../../assets/images/image6.jpeg'
import image7 from '../../assets/images/image7.jpeg'
import image8 from '../../assets/images/image8.jpeg'
import image9 from '../../assets/images/image9.jpeg'
import image10 from '../../assets/images/image10.jpeg'
import image11 from '../../assets/images/image11.jpeg'
import image12 from '../../assets/images/image12.jpeg'
import image13 from '../../assets/images/image13.jpeg'
import image14 from '../../assets/images/image14.png'
import image15 from '../../assets/images/image15.jpeg'
import image16 from '../../assets/images/image16.jpeg'
import image17 from '../../assets/images/image17.jpeg'
import image18 from '../../assets/images/image18.jpeg'
import image19 from '../../assets/images/image19.jpeg'
import image20 from '../../assets/images/image20.jpeg'
import image21 from '../../assets/images/image21.jpeg'
import image22 from '../../assets/images/image22.jpeg'
import image23 from '../../assets/images/image23.jpeg'
import image24 from '../../assets/images/image24.jpeg'
import image25 from '../../assets/images/image25.jpeg'
import image26 from '../../assets/images/image26.png'
import image27 from '../../assets/images/image27.jpeg'
import image28 from '../../assets/images/image28.png'
import image29 from '../../assets/images/image29.jpeg'
import image30 from '../../assets/images/image30.png'
import image31 from '../../assets/images/image31.png'
import image32 from '../../assets/images/image32.jpeg'
import image33 from '../../assets/images/image33.png'
import image34 from '../../assets/images/image34.jpeg'
import image35 from '../../assets/images/image35.png'
import image36 from '../../assets/images/image36.jpeg'
import image37 from '../../assets/images/image37.jpeg'
import image38 from '../../assets/images/image38.jpeg'
import image39 from '../../assets/images/image39.png'
import image40 from '../../assets/images/image40.png'
import image41 from '../../assets/images/image41.png'
import image42 from '../../assets/images/image42.jpeg'
import image43 from '../../assets/images/image43.jpeg'
import image44 from '../../assets/images/image44.jpeg'
import image45 from '../../assets/images/image45.jpeg'
import image46 from '../../assets/images/image46.png'
import image47 from '../../assets/images/image47.png'
import image48 from '../../assets/images/image48.png'
import image49 from '../../assets/images/image49.jpeg'
import image50 from '../../assets/images/image50.jpeg'
import image51 from '../../assets/images/image51.png'
import image52 from '../../assets/images/image52.png'
import image53 from '../../assets/images/image53.png'

const resources = [
  { title: "30-Minute Drawing Techniques and Tools for Beginners", type: "article", link: "https://www.artsy.net/article/artsy-editorial-5-themes-will-define-art-market-2024", image: image1 },
  { title: "Understanding the Art Market: Trends in Drawing", type: "article", link: "https://azuramagazine.com/articles/art-market-trends-whats-hot-in-the-art-world", image: image2 },
  { title: "The Evolution of Drawing in Contemporary Art", type: "article", link: "https://human.libretexts.org/Bookshelves/Art/History_of_Modern_and_Contemporary_Art_(Gustlin_and_Gustlin)/01%3A_How_Modern_and_Contemporary_Art_Evolved/1.02%3A_Evolution_of_Modern_and_Contemporary_Art", image: image3 },
  { title: "Innovative Approaches to Drawing: What’s Next?", type: "article", link: "https://www.accessart.org.uk/three-approaches-to-drawing/", image: image4 },
  { title: "The Future of Drawing: Insights from Industry Experts", type: "article", link: "https://profiletree.com/future-opportunities-in-drawing/", image: image5 },
  { title: "2024 Painting Trends: What to Expect", type: "article", link: "https://www.startus-insights.com/innovators-guide/paint-industry-trends/", image: image6 },
  { title: "Painting Market Insights: Current Trends and Predictions", type: "article", link: "https://www.fortunebusinessinsights.com/industry-reports/paints-and-coatings-market-101947", image: image7 },
  { title: "Techniques to Elevate Your Painting", type: "article", link: "https://www.milanartinstitute.com/blog/painting-techniques", image: image8 },
  { title: "Sustainable Practices in Painting", type: "article", link: "https://artsartistsartwork.com/eco-friendly-ethical-art-trends-in-sustainable-practice/", image: image9 },
  { title: "The Intersection of Digital and Traditional Painting", type: "article", link: "https://indianartideas.in/blog/traditional-art/the-resurgence-of-traditional-painting-in-the-digital-age", image: image10 },
  { title: "How Storytelling Influences Digital Content Creation", type: "article", link: "https://aicontentfy.com/en/blog/art-of-storytelling-in-content-creation", image: image11 },
  { title: "Writing for Visual Artists: Creating Impactful Stories", type: "article", link: "https://atelierkristel.medium.com/the-art-of-storytelling-narratives-in-visual-art-7533af9fc320", image: image12 },
  { title: "How to Develop a Story Idea", type: "article", link: "https://www.masterclass.com/articles/how-to-develop-your-writing-ideas", image: image13 },
  { title: "The Power of Storytelling in Marketing", type: "article", link: "https://academic.oup.com/advertising-and-corporate-services/pages/the-importance-of-storytelling-in-marketing", image: image14 },
  { title: "How to Write a Short Story ", type: "article", link: "https://writers.com/how-to-write-a-short-story", image: image15 },
  { title: "The Poetry Market: Trends and Opportunities", type: "article", link: "https://www.katyevansbush.com/news/poetry-and-the-market", image: image16 },
  { title: "Integrating Poetry into Visual Art", type: "article", link: "https://theartofeducation.edu/2019/12/how-to-connect-art-and-poetry-in-the-art-room/", image: image17 },
  { title: "Emerging Voices in Poetry: What's Trending?", type: "article", link: "https://www.salismania.com/single-post/emerging-voices", image: image18 },
  { title: "Writing Poetry for Artists: Techniques and Inspirations" , type: "article", link: "https://blogs.calbaptist.edu/dazed-starling/2023/04/12/how-to-be-inspired-to-write-poetry/", image: image19 },
  { title: "The Intersection of Poetry and Visual Arts", type: "article", link: "https://www.bemiscenter.org/events/art-in-practice-jeffrey-gibson-and-layli-long-soldier", image: image20 },
  { title: "The Craft Market: Trends and Insights?", type: "article", link: "https://www.mintel.com/insights/consumer-research/arts-and-crafts-industry-trends/", image: image21 },
  { title: "Innovative Crafting Techniques for Today’s Market", type: "article", link: "https://chaindrive.com/art-and-craft-store-marketing-strategy/", image: image22 },
  { title: "Marketing Your Crafts: Strategies for Success", type: "article", link: "https://www.wordstream.com/blog/ws/2015/11/12/etsy-marketing", image: image23 },
  { title: "Sustainable Crafting Practices for Modern Artists", type: "article", link: "https://refash.in/blogs/blog/indian-crafts-upcycled-edition?srsltid=AfmBOoq5k3XsTw43s6f6G-C2Xm2k06oqfrIbnkKSK2mWVfc10mot_TtG", image: image24 },
  { title: "The Future of Crafts: Digital vs. Traditional", type: "article", link: "https://www.sovereignmagazine.com/culture/traditional-crafts-in-todays-digital-world/", image: image25 },

  { title: "How Art can help you analyze?", type: "video", videoSrc: "https://www.youtube.com/embed/ubEadhXWwV4",},
  { title: "Learning to Draw Digitally for Beginners", type: "video", videoSrc: "https://www.youtube.com/embed/WLU26nqcvfY?si=9P3UnszA7HHIZHk8",},
  { title: "How good is your Art? Test your Drawings!", type: "video", videoSrc: "https://www.youtube.com/embed/NSvGEpAUO4c?si=WU3meZzT58c1M3qb",},
  { title: "HOW TO SKETCH | Tips and Tricks", type: "video", videoSrc: "https://www.youtube.com/embed/2jBbTweQuaU?si=PK1wIpgs0P2EfXHG",},
  { title: "PROCREATE Landscape DRAWING Tutorial", type: "video", videoSrc: "https://www.youtube.com/embed/e7qtC_e8Jxc?si=YQJk9kHzr3149LFz",},
  { title: "Paint ANYTHING in just 4 Simple Steps!", type: "video", videoSrc: "https://www.youtube.com/embed/rcfMSeilPkg?si=gkMbQbz2n69-jCMY",},
  { title: "How to ACTUALLY Start Drawing?", type: "video", videoSrc: "https://www.youtube.com/embed/VtgB2pCC73M?si=QF5hyKS9kGY7cSD2",},
  { title: "How to start Acrylic Painting For Beginners", type: "video", videoSrc: "https://www.youtube.com/embed/CiVkU-UOG4g?si=9JimL1pgwxaCxbp9",},
  { title: "Digital Art ESSENTIALS For Beginners! ", type: "video", videoSrc: "https://www.youtube.com/embed/OzemCeywKOM?si=gMbuX4isPsbaI_yA",},
  { title: "Ultimate Beginners Guide to Start Painting", type: "video", videoSrc: "https://www.youtube.com/embed/PXa48XLLBXQ?si=bzeE8HagUJbiMShg",},
  { title: "how to write poetry for beginners", type: "video", videoSrc: "https://www.youtube.com/embed/7mhd6Mj0QtM?si=KRXmOkonqtIHBJQU",},
  { title: "So You Wanna Be A Writer", type: "video", videoSrc: "https://www.youtube.com/embed/gn5dYPMSjaY?si=bazOJ5O-SXDnQcPI",},
  { title: "How to Write Better Poems | A Poet Explains", type: "video", videoSrc: "https://www.youtube.com/embed/arE2yyQe1PY?si=PwkWEuc6Db16LP75",},
  { title: "5 Uncommon POETRY TIPS to Instantly Write BETTER POEMS", type: "video", videoSrc: "https://www.youtube.com/embed/",},
  { title: "Parts of a Poem | Elements of Poetry | Poetry for Beginners", type: "video", videoSrc: "https://www.youtube.com/embed/ZsfMk7KKiI4?si=h4kQbCd7lHBL8Lxn",},
  { title: "PROCREATE Landscape DRAWING Tutorial", type: "video", videoSrc: "https://www.youtube.com/embed/6R49IH6Id3c?si=BoWVi2jjPwhwiLwJ",},
  { title: "Easy Paper Crafts Anyone Can Do ", type: "video", videoSrc: "https://www.youtube.com/embed/baf0dO8xSwE?si=8lR8dXpskc1D7ZQI",},
  { title: "COOL CRAFTS TO TRY ", type: "video", videoSrc: "https://www.youtube.com/embed/BpTpuMBuTCQ?si=MY8gfodyH1xzGY6f",},
  { title: "How to Make Cute Crafts With Paper", type: "video", videoSrc: "https://www.youtube.com/embed/OXjfD2dMJ_E?si=2G7WTn-vYXlpux0d",},
  { title: "35 UNUSUAL PAPER CRAFT YOU WILL ADORE", type: "video", videoSrc: "https://www.youtube.com/embed/SF71ks5FrKQ?si=D3XGEJRAzs_3OkoW",},
  { title: "How to Write a Short Story (for BEGINNERS)", type: "video", videoSrc: "https://www.youtube.com/embed/5PCwca1a3uw?si=j345DzUVA5HOmrLH",},
  { title: "Creative Writing - Writing Tips from a Professional Author", type: "video", videoSrc: "https://www.youtube.com/embed/KvT8u49Y7L4?si=gk4xvOg9lb_1QZFe",},
  { title: "How to make a career in writing?", type: "video", videoSrc: "https://www.youtube.com/embed/o9-RksVxYWY?si=G7Y8yTpPN_TYqEvV",},
  { title: "How to Level Up Your Creative Writing Skills!", type: "video", videoSrc: "https://www.youtube.com/embed/TzTki04HlDw?si=0_jCtBoiXLm3_NOZ",},
  { title: "How to Handle Personal Stories in Your Book", type: "video", videoSrc: "https://www.youtube.com/embed/xOPm98uzTE0?si=5tCbw1KN1BEjb-vQ",},
];


const otherResources = {
  Drawing_and_Painting_Websites: [
    { title: "DeviantArt", link: "https://www.deviantart.com/", icon: image26 },
    { title: "ArtStation", link: "https://www.artstation.com/?sort_by=community&dimension=all", icon: image27 },
    { title: "Behance", link: "https://www.behance.net/search/projects", icon: image28 },
    { title: "Pixilart", link: "https://www.pixilart.com/", icon: image29 },
    { title: "Sketchfab", link: "https://sketchfab.com/", icon: image30 },
    { title: "Dribbble", link: "https://dribbble.com/", icon: image31 },
    { title: "Clip Studio Paint", link: "https://www.clipstudio.net/en/", icon: image32 },
    { title: "Aggie.io", link: "https://magma.com/", icon: image33 },
    { title: "Krita", link: "https://krita.org/en/", icon: image34 },
    { title: "Drawpile", link: "https://drawpile.net/", icon: image35 },
  ],

  Crafts: [
    { title: "Pinterest", link: "https://in.pinterest.com/", icon: image36 },
    { title: "Instructables", link: "https://www.instructables.com/", icon: image37 },
    { title: "Craftsy", link: "https://www.craftsy.com/", icon: image38 },
    { title: "Ravelry", link: "https://www.ravelry.com/account/login", icon: image39 },
    { title: "Creativebug", link: "", icon: image40 },
  ],

  Poetry: [
    { title: "Poetry Foundation", link: "https://www.poetryfoundation.org/", icon: image41 },
    { title: "AllPoetry", link: "https://allpoetry.com/", icon: image42 },
    { title: "Poets.org", link: "https://poets.org/", icon: image43 },
    { title: "Hello Poetry", link: "https://hellopoetry.com/", icon: image44 },
  ],

  Stories: [
    { title: "Wattpad", link: "https://www.wattpad.com/home", icon: image45 },
    { title: "Archive of Our Own (AO3)", link: "https://archiveofourown.org/", icon: image46 },
    { title: "Storybird", link: "https://storybird.com/", icon: image47 },
    { title: "Commaful", link: "https://commaful.com/", icon: image48 },
  ],

  Templates_and_Images_Websites :[
    { title: "Canva", link: "https://www.canva.com", icon: image49 },
    { title: "Adobe Express", link: "https://www.adobe.com/in/express/", icon: image50 },
    { title: "Template.net", link: "https://www.template.net/", icon: image51 },
    { title: "Piktochart", link: "https://piktochart.com/", icon: image52 },
    { title: "Visme", link: "https://www.visme.co/logo-maker/", icon: image53 },
  ]
};

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [otherSearchQuery, setOtherSearchQuery] = useState(""); // New state for other resources
  const [filter, setFilter] = useState("all");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("recommended");
  const dropdownRef = useRef(null);

  // Filter resources based on search query and selected filter
  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || resource.type === filter; // Check filter
    return matchesSearch && matchesFilter; // Combine both conditions
  });

  // Filter other resources based on the search query
  const filteredOtherResources = Object.entries(otherResources).reduce((acc, [category, links]) => {
    const filteredLinks = links.filter(link => 
      link.title.toLowerCase().includes(otherSearchQuery.toLowerCase())
    );
    if (filteredLinks.length > 0) {
      acc[category] = filteredLinks;
    }
    return acc;
  }, {});

  // Effect to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="resources-page">
      {/* Header Section: Title and Search Bar */}
      <div className="resources-header">
        <h1 className="resources-title">Resources</h1>
        {activeTab === "other" && ( // Search bar only for the "Other Resources" tab
          <div className="other-resources-search">
            <input
              type="text"
              placeholder="Search other resources..."
              value={otherSearchQuery}
              onChange={(e) => setOtherSearchQuery(e.target.value)}
            />
          </div>
        )}
        <div className="search-filter-section">
          {activeTab === "recommended" && (
            <>
              <input
                type="text"
                placeholder="Search recommended..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="filter-button-container">
                <FaFilter
                  className="filter-icon"
                  onClick={() => setShowDropdown((prev) => !prev)}
                />
                {showDropdown && (
                  <div className="filter-dropdown" ref={dropdownRef}>
                    <div onClick={() => { setFilter("all"); setShowDropdown(false); }}>All</div>
                    <div onClick={() => { setFilter("article"); setShowDropdown(false); }}>Articles</div>
                    <div onClick={() => { setFilter("video"); setShowDropdown(false); }}>Videos</div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Toggle for Recommended and Other Resources */}
      <div className="resources-toggle">
        <button 
          className={activeTab === "recommended" ? "active" : ""}
          onClick={() => setActiveTab("recommended")}
        >
          Recommended
        </button>
        <button 
          className={activeTab === "other" ? "active" : ""}
          onClick={() => setActiveTab("other")}
        >
          Other Resources
        </button>
      </div>

      {/* Resource Cards for Recommended */}
      {activeTab === "recommended" && (
        <div className="resource-grid">
          {filteredResources.map((resource, index) => (
            <div key={index} className="resource-card">
              {resource.type === "video" ? (
                <iframe 
                  width="100%" 
                  height="200" 
                  src={resource.videoSrc} 
                  title={resource.title} 
                  frameBorder="0" 
                  allowFullScreen
                />
              ) : (
                <img src={resource.image} alt={resource.title} />
              )}
              <h5>{resource.title}</h5>
              {resource.type === "video" ? (
                <a href={resource.videoSrc} target="_blank" rel="noopener noreferrer" className="resource-button">
                  Watch Video
                </a>
              ) : (
                <a href={resource.link} target="_blank" rel="noopener noreferrer" className="resource-button">
                  Read Article
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Other Resources Section */}
      {activeTab === "other" && (
        <div className="other-resources">
          {Object.entries(filteredOtherResources).map(([category, links]) => (
            <div className="resource-category" key={category}>
              <h3>{category.replace(/_/g, " ")}</h3>
              <div className="resource-links">
                {links.slice(0, 10).map((link, index) => ( // Display only top 10 websites
                  <div className="resource-item" key={index}>
                    <span>{link.title}</span>
                    <a href={link.link} target="_blank" rel="noopener noreferrer">
                      <img src={link.icon} alt={`${link.title} logo`} className="resource-logo" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Resources;
