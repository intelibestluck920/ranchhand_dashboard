exports.getAllAnimalData = (req, res) => {
    const q = "SELECT * FROM rancher_exam";
    db.query(q, (err, data) => {
        if (err) return res.status(403).json(err);
        return res.json(data);
    });
}

exports.getAllAnimalDataDate = (req, res) => {
    const q = "SELECT date FROM rancher_exam WHERE animal_id = 113";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        let date_array = data.map((item) => item.date);
        return res.status(200).json(date_array)
    });
}

exports.getAllAnimalId = (req, res) => {
    const q = "SELECT animal_id FROM rancher_exam";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        let initialId = data[0]?.animal_id;
        let output = [initialId];
        data.forEach((element) => {
            if (initialId !== element?.animal_id) {
                if (!(output.includes(element?.animal_id))) output.push(element?.animal_id);
                initialId = element?.animal_id;
            }
        });
        let sortedOutput = output.sort((a, b) => a - b);
        return res.json(sortedOutput);
    });
}

exports.getAnimalDataFromId = (req, res) => {
    const animalId = req.params.id;

    const q = "SELECT * FROM rancher_exam WHERE animal_id = ?";
    db.query(q, [animalId], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
}