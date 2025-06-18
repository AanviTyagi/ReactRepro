import React from 'react';
import { Link } from 'react-router-dom';

const articles = [
  {
    title: 'Understanding Menstrual Cycles',
    desc: `Learn about the different phases of the menstrual cycle and what's normal for your body`,
    image: '/assets/images/menstrual-cycle.png',
    link: 'https://helloclue.com/articles/cycle-a-z/the-menstrual-cycle-more-than-just-the-period',
  },
  {
    title: 'The Importance of Prenatal Care',
    desc: 'Discover why regular check-ups and a healthy lifestyle are crucial for a smooth pregnancy',
    image: '/assets/images/prenatal-care.png',
    link: 'https://nimaaya.com/blog/importance-of-prenatal-care/#:~:text=Prenatal%20care%20empowers%20parents%20with,the%20mother%20and%20the%20baby.',
  },
  {
    title: 'What is orchitis?',
    desc: 'Orchitis is an inflammation of the testicles. It can be caused by either bacteria or a virus.',
    image: '/assets/images/testicle.png',
    link: 'https://www.healthline.com/health/orchitis',
  },
  {
    title: 'Myths and Facts About: Endometriosis',
    desc: 'Endometriosis is a commonly found illness in women that is chronic, painful, and gets steadily worse. ....',
    image: '/assets/images/uterus.png',
    link: 'https://www.shreeivfclinic.com/blogs/myths-and-facts-about-endometriosis/',
  },
  {
    title: 'The Journey of Egg from Ovary to Uterus',
    desc: 'Follow the detailed journey of an egg from the ovary to the uterus',
    image: '/assets/images/fertilization.png',
    link: 'https://www.britannica.com/science/fertilization-reproduction',
  },
  {
    title: 'Male Reproductive Health: Beyond the Basics',
    desc: 'Male infertility, which affects approximately 7% of men globally, is a complex pathological condition...',
    image: '/assets/images/male-reproductive-system.png',
    link: 'https://www.mdpi.com/journal/genes/special_issues/F80540NNE4',
  },
  {
    title: 'Undescended Testicles:Cryptorchidism',
    desc: '"Undescended testicle" is the term used when one or both of the testicles fail to descend into the scrotum.',
    image: '/assets/images/genitalia.png',
    link: 'https://www.urologyhealth.org/urology-a-z/u/undescended-testicles-(cryptorchidism)',
  },
  {
    title: `Menopause, Women's Health, and Work`,
    desc: 'Most women experience menopause between ages 45 and 55. Common symptoms include hot flashes, vaginal dryness, and mood changes.',
    image: '/assets/images/menopause.png',
    link: 'https://www.cdc.gov/womens-health/features/menopause-womens-health-and-work.html',
  },
  {
    title: 'What Is Testicular Disease?',
    desc: 'Testicular disease is any medical condition that affects the testicles, which are the male reproductive organs responsible for producing sperm and testosterone.',
    image: '/assets/images/testicular.png',
    link: 'https://www.webmd.com/men/testicular-disease',
  },
];

const Articles = () => {
  return (
    <div className="bg-green-50 min-h-screen">
      {/* Featured Articles Section */}
      <section className="max-w-6xl mx-auto p-8 my-8">
        <h1 className="text-5xl font-bold mb-4">Featured Articles</h1>
        <button className="bg-black text-white px-6 py-2 rounded-md mb-8 hover:bg-gray-800">Read More</button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <a
              key={idx}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-sm p-6 border hover:shadow-lg transition flex flex-col cursor-pointer min-h-[180px]"
            >
              <img src={article.image} alt={article.title} className="w-16 h-16 object-contain mb-2 mx-auto" />
              <div className="font-bold text-lg mb-1">{article.title}</div>
              <div className="text-gray-600 text-sm">{article.desc}</div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Articles; 