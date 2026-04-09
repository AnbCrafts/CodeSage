export const checkUsageLimit = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const today = new Date().toISOString().split('T')[0];

    // Reset count if it's a new day
    if (user.usage.date !== today) {
        user.usage.date = today;
        user.usage.count = 0;
    }

    // If Free User and limit reached (e.g., 10 requests/day)
    if (!user.isPro && user.usage.count >= 10) {
        return res.status(429).json({ 
            message: "Daily limit reached for free tier. Upgrade to Pro for unlimited access!" 
        });
    }

    // Increment usage
    user.usage.count += 1;
    await user.save();
    next();
};