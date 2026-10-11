import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  try {
    await connectDatabase();

    const users = [];
    for (const userData of [
      {
        username: 'alex_runner',
        email: 'alex.runner@example.com',
        displayName: 'Alex Rivera',
      },
      {
        username: 'jamie_cyclist',
        email: 'jamie.cyclist@example.com',
        displayName: 'Jamie Chen',
      },
      {
        username: 'sam_yoga',
        email: 'sam.yoga@example.com',
        displayName: 'Sam Patel',
      },
    ]) {
      const existingUser = await User.findOne({ username: userData.username });
      if (existingUser) {
        existingUser.set(userData);
        await existingUser.save();
        users.push(existingUser);
      } else {
        users.push(await new User(userData).save());
      }
    }

    const teams = [];
    for (const teamData of [
      {
        name: 'Morning Movers',
        description: 'A community team for active starts and steady progress.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Mindful Miles',
        description: 'A balanced team for movement, recovery, and consistency.',
        members: [users[2]._id],
      },
    ]) {
      const existingTeam = await Team.findOne({ name: teamData.name });
      if (existingTeam) {
        existingTeam.set(teamData);
        await existingTeam.save();
        teams.push(existingTeam);
      } else {
        teams.push(await new Team(teamData).save());
      }
    }

    const activities = [
      {
        user: users[0]._id,
        activityType: 'Running',
        durationMinutes: 35,
        distanceKm: 5.2,
        points: 52,
        date: new Date('2026-10-09T07:30:00.000Z'),
      },
      {
        user: users[1]._id,
        activityType: 'Cycling',
        durationMinutes: 50,
        distanceKm: 18,
        points: 60,
        date: new Date('2026-10-09T08:15:00.000Z'),
      },
      {
        user: users[2]._id,
        activityType: 'Yoga',
        durationMinutes: 40,
        points: 40,
        date: new Date('2026-10-10T09:00:00.000Z'),
      },
    ];
    for (const activityData of activities) {
      const existingActivity = await Activity.findOne({
        user: activityData.user,
        activityType: activityData.activityType,
        date: activityData.date,
      });
      if (existingActivity) {
        existingActivity.set(activityData);
        await existingActivity.save();
      } else {
        await new Activity(activityData).save();
      }
    }

    const leaderboardEntries = [
      { user: users[0]._id, team: teams[0]._id, points: 520, period: '2026-10' },
      { user: users[1]._id, team: teams[0]._id, points: 480, period: '2026-10' },
      { user: users[2]._id, team: teams[1]._id, points: 430, period: '2026-10' },
    ];
    for (const entry of leaderboardEntries) {
      const existingEntry = await Leaderboard.findOne({
        user: entry.user,
        period: entry.period,
      });
      if (existingEntry) {
        existingEntry.set(entry);
        await existingEntry.save();
      } else {
        await new Leaderboard(entry).save();
      }
    }

    const workouts = [
      {
        title: 'Easy Endurance Run',
        description: 'A conversational-pace run to build aerobic endurance.',
        activityType: 'Running',
        durationMinutes: 30,
        difficulty: 'beginner',
      },
      {
        title: 'Tempo Ride',
        description: 'A steady cycling session with several comfortably hard efforts.',
        activityType: 'Cycling',
        durationMinutes: 45,
        difficulty: 'intermediate',
      },
      {
        title: 'Full-Body Mobility Flow',
        description: 'A gentle sequence focused on mobility, balance, and recovery.',
        activityType: 'Yoga',
        durationMinutes: 25,
        difficulty: 'beginner',
      },
    ];
    for (const workoutData of workouts) {
      const existingWorkout = await Workout.findOne({ title: workoutData.title });
      if (existingWorkout) {
        existingWorkout.set(workoutData);
        await existingWorkout.save();
      } else {
        await new Workout(workoutData).save();
      }
    }

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

await seedDatabase();
