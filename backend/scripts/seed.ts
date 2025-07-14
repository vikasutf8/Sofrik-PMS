import dotenv from 'dotenv'; 
import mongoose from 'mongoose'; 
import User from '../src/models/User'; 
import Project from '../src/models/Project'; 
import Task from '../src/models/Task'; 

// Load environment variables 
dotenv.config(); 

const seedData = async () => { 
  try { 
    // Connect to MongoDB 
    const mongoUri = process.env.MONGODB_URI; 
    if (!mongoUri) { 
      throw new Error('MONGODB_URI is not defined'); 
    } 

    await mongoose.connect(mongoUri); 
    console.log('✅ Connected to MongoDB'); 

    // Clear existing data 
    await User.deleteMany({}); 
    await Project.deleteMany({}); 
    await Task.deleteMany({}); 
    console.log('🧹 Cleared existing data'); 

    // Create test user 
    const testUser = new User({ 
      email: 'test@example.com', 
      password: 'Test@123' 
    }); 
    await testUser.save(); 
    console.log('👤 Created test user'); 

    // Create projects 
    const project1 = new Project({ 
      title: 'E-commerce Website', 
      description: 'Build a modern e-commerce platform with React and Node.js', 
      status: 'active', 
      user: testUser._id 
    }); 

    const project2 = new Project({ 
      title: 'Mobile App Development', 
      description: 'Develop a cross-platform mobile app using React Native', 
      status: 'active', 
      user: testUser._id 
    }); 

    const project3 = new Project({ 
      title: 'Data Analytics Dashboard', 
      description: 'Create a comprehensive analytics dashboard for business insights', 
      status: 'completed', 
      user: testUser._id 
    }); 

    // Save projects
    const savedProjects = await Promise.all([
      project1.save(),
      project2.save(),
      project3.save()
    ]);
    console.log('📋 Created projects');

    // Create tasks for each project
    const tasks = [];

    // Tasks for project 1 (E-commerce Website)
    tasks.push(
      new Task({
        title: 'Design database schema',
        description: 'Create MongoDB schema for products, users, and orders',
        status: 'done',
        project: savedProjects[0]._id,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
      }),
      new Task({
        title: 'Implement user authentication',
        description: 'Set up JWT authentication for customer accounts',
        status: 'in-progress',
        project: savedProjects[0]._id,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
      }),
      new Task({
        title: 'Create product listing page',
        description: 'Develop frontend UI for browsing products with filters',
        status: 'todo',
        project: savedProjects[0]._id,
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) // 10 days from now
      }),
      new Task({
        title: 'Set up payment gateway',
        description: 'Integrate Stripe for secure payment processing',
        status: 'todo',
        project: savedProjects[0]._id,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
      })
    );

    // Tasks for project 2 (Mobile App Development)
    tasks.push(
      new Task({
        title: 'Create app wireframes',
        description: 'Design UI/UX wireframes for all app screens',
        status: 'done',
        project: savedProjects[1]._id,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
      }),
      new Task({
        title: 'Set up React Native environment',
        description: 'Configure development environment for iOS and Android',
        status: 'done',
        project: savedProjects[1]._id,
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 days from now
      }),
      new Task({
        title: 'Implement navigation system',
        description: 'Set up React Navigation for app routing',
        status: 'in-progress',
        project: savedProjects[1]._id,
        dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000) // 6 days from now
      }),
      new Task({
        title: 'Build API integration layer',
        description: 'Create services to connect with backend APIs',
        status: 'todo',
        project: savedProjects[1]._id,
        dueDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000) // 9 days from now
      })
    );

    // Tasks for project 3 (Data Analytics Dashboard)
    tasks.push(
      new Task({
        title: 'Define dashboard metrics',
        description: 'Identify key performance indicators to display',
        status: 'done',
        project: savedProjects[2]._id,
        dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000) // 4 days from now
      }),
      new Task({
        title: 'Create data visualization components',
        description: 'Build reusable chart components with D3.js',
        status: 'done',
        project: savedProjects[2]._id,
        dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000) // 8 days from now
      }),
      new Task({
        title: 'Implement data filtering',
        description: 'Add date range and category filters for analytics',
        status: 'in-progress',
        project: savedProjects[2]._id,
        dueDate: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000) // 11 days from now
      }),
      new Task({
        title: 'Create export functionality',
        description: 'Add options to export reports as CSV and PDF',
        status: 'todo',
        project: savedProjects[2]._id,
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days from now
      })
    );

    // Save all tasks
    await Task.insertMany(tasks);
    console.log('✅ Created tasks');

    console.log('✅ Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

// Run the seed function
seedData();