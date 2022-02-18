import { getHabits, addHabit, deleteHabit, updateHabit } from '../../utils/database'

// Handle All Requests to 'api/badge'
export default async function handler(req, res){
    // Switch The Methods
    switch (req.method) {
        case 'GET': {
            return getHabits(req, res);
        }
        case 'POST': {
            return addHabit(req, res);
        }
        case 'PUT': {
            return updateHabit(req, res);
        }
        case 'DELETE': {
            return deleteHabit(req, res);
        }
    }
}