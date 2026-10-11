import { Router } from 'express';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

const router = Router();

router.get('/api/users/', async (_request, response, next) => {
  try {
    response.json(await User.find().select('-passwordHash').lean());
  } catch (error) {
    next(error);
  }
});

router.get('/api/teams/', async (_request, response, next) => {
  try {
    response.json(await Team.find().populate('members', '-passwordHash').lean());
  } catch (error) {
    next(error);
  }
});

router.get('/api/activities/', async (_request, response, next) => {
  try {
    response.json(await Activity.find().populate('user', '-passwordHash').lean());
  } catch (error) {
    next(error);
  }
});

router.get('/api/leaderboard/', async (_request, response, next) => {
  try {
    response.json(
      await Leaderboard.find()
        .populate('user', '-passwordHash')
        .populate('team')
        .sort({ points: -1 })
        .lean(),
    );
  } catch (error) {
    next(error);
  }
});

router.get('/api/workouts/', async (_request, response, next) => {
  try {
    response.json(await Workout.find().lean());
  } catch (error) {
    next(error);
  }
});

export default router;
