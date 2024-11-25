import NITLogo from 'public/fixed/images/logos/nit-raipur-logo.png'
import udacityLogo from 'public/fixed/images/logos/udacity-logo.png'
import iiscLogo from 'public/fixed/images/logos/iisc-logo.jpg'
import StanfordLogo from 'public/fixed/images/logos/stanford-logo.png'
import KubernetesLogo from 'public/fixed/images/logos/kubernetes.svg'


export const educationData = [
  {
    id: 1,
    title: 'Bachelor of Technology in Computer Science and Engineering',
    institute: 'National Institute of Technology, Raipur',
    period: '2014 - 2018',
    imageUrl: NITLogo,
    altText: 'NIT Raipur',
    details: [
      'Thesis: "Diabetic Retinopathy Detection using Deep Learning"',
      "Pre-Thesis: Deposist Prediction using Machine Learning Models",
      "Finalist in the Smart India Hackathon 2018",
      "Winner of the NIT Raipur Model Making 2017",

    ],
  },

  {
    id: 1,
    title: 'Data Analyst Nanodegree',
    institute: 'Udacity',
    period: '2018 - 2019',
    imageUrl: udacityLogo, // Replace with the URL of your image
    altText: 'Udacity',
    details: [
      'Completed the Data Analyst Nanodegree',
      "Projects: Investigate a Dataset, Analyze A/B Test Results, Wrangle and Analyze Data, Communicate Data Findings",
      "Skills: Python, Pandas, Numpy, Matplotlib, Seaborn, Jupyter Notebook",
    ],
  },
  {
    id: 2,
    title: 'CS 224w: Machine Learning with Graphs',
    institute: 'Stanford Center for Professional Development',
    period: '2021',
    imageUrl: StanfordLogo,
    altText: 'Stanford University',
    details: [
      'Completed the course on Machine Learning with Graphs',
      "Skills: Graph Neural Networks, Graph Convolutional Networks, GraphSAGE, Graph Attention Networks",
    ],
  },
  {
    id: 3,
    title: 'Introduction to High-Performance Computing',
    institute: 'CCE Indian Institute of Science, Bangalore',
    period: 'Aug 2023 - Dec 2023',
    imageUrl: iiscLogo,
    altText: 'IISc Bangalore',
    details: [
      'Single Semester Course on High-Performance Computing',
      "Skills: MPI, OpenMP, CUDA, Parallel Programming",

    ],

  }

]