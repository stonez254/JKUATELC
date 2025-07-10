const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String, required: true },
  course: { type: String, required: true },
  year: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

app.post('/register', upload.single('image'), async (req, res) => {
  const { fullName, password, course, year } = req.body;

  if (!fullName || !password || !course || !year || !req.file) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const uploaded = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      password: hashedPassword,
      profileImage: uploaded.secure_url,
      course,
      year
    });

    await user.save();
    res.status(201).json({ message: '✅ User registered successfully' });

  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

