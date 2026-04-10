import logo from './logo.png'
import logo_icon from './logo_icon.png'
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import star_icon from './star_icon.svg'
import rating_star from './rating_star.svg'
import sample_img_1 from './sample_img_1.png'
import sample_img_2 from './sample_img_2.png'
import sample_img_3 from './sample_img_3.png'
import sample_img_4 from './sample_img_4.png'
import sample_img_5 from './sample_img_5.png'
import sample_img_6 from './sample_img_6.png'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import profile_female_1 from './profile_female_1.png'
import profile_male_1 from './profile_male_1.png'
import profile_male_2 from './profile_male_2.png'
import step_icon_1 from './step_icon_1.svg'
import step_icon_2 from './step_icon_2.svg'
import step_icon_3 from './step_icon_3.svg'
import email_icon from './email_icon.svg'
import lock_icon from './lock_icon.svg'
import cross_icon from './cross_icon.svg'
import star_group from './star_group.png'
import credit_star from './credit_star.svg'
import profile_icon from './profile_icon.png'

export const assets = {
    logo,
    logo_icon,
    facebook_icon,
    instagram_icon,
    twitter_icon,
    star_icon,
    rating_star,
    sample_img_1,
    sample_img_2,
    sample_img_3,
    sample_img_4,
    sample_img_5,
    sample_img_6,
    email_icon,
    lock_icon,
    cross_icon,
    star_group,
    credit_star,
    profile_icon
}

export const stepsData = [
    {
      title: 'Describe Your Vision',
      description: 'Type a phrase, sentence, or paragraph that describes the image you want to create.',
      icon: step_icon_1,
    },
    {
      title: 'Watch the Magic',
      description: 'Our AI-powered engine will transform your text into a high-quality, unique image in seconds.',
      icon: step_icon_2,
    },
    {
      title: 'Download & Share',
      description: 'Instantly download your creation or share it with the world directly from our platform.',
      icon: step_icon_3,
    },
  ];

export const testimonialsData = [
    {
        image: profile_female_1,
        name: 'Sofia Martinez',
        role: 'UI/UX Designer',
        stars: 5,
        text: `PromptixAI has completely changed how I prototype. I can generate stunning visuals from a single line of text in seconds — it saves me hours of work every single day.`
    },
    {
        image: profile_male_1,
        name: 'James Carter',
        role: 'Social Media Manager',
        stars: 5,
        text: `I use PromptixAI daily for creating eye-catching post visuals. The image quality is incredible and the credit system makes it super affordable for my workflow.`
    },
    {
        image: profile_male_2,
        name: 'Liam O\'Brien',
        role: 'Freelance Illustrator',
        stars: 5,
        text: `I was skeptical at first, but the results blew me away. PromptixAI understands creative prompts really well and the output is publication-ready.`
    },
]

export const plans = [
    {
      id: 'Basic',
      price: 10,
      credits: 100,
      desc: 'Best for personal use.'
    },
    {
      id: 'Advanced',
      price: 50,
      credits: 500,
      desc: 'Best for business use.'
    },
    {
      id: 'Business',
      price: 250,
      credits: 5000,
      desc: 'Best for enterprise use.'
    },
  ]