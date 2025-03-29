export class MediaController {
    static async getImageByName(req, res) {
        if (!req.auth.user) {
            res.status(401).json({
                status: 401,
                message: 'Unauthorized, you need being authenticated to process the request.'
            });

            return;
        }
    };

    static async saveAvatarImage(req, res) {
        if (!req.auth.user) {
            res.status(401).json({
                status: 401,
                message: 'Unauthorized, you need being authenticated to process the request.'
            });

            return;
        }

        res.status(200).json({
            file: req.file
        })
    };

    static async saveCoverImage(req, res) {
        if (!req.auth.user) {
            res.status(401).json({
                status: 401,
                message: 'Unauthorized, you need being authenticated to process the request.'
            });

            return;
        }
    };

    static async deleteAvatarImage(req, res) {
        if (!req.auth.user) {
            res.status(401).json({
                status: 401,
                message: 'Unauthorized, you need being authenticated to process the request.'
            });

            return;
        }
    };

    static async deleteCoverImage(req, res) {
        if (!req.auth.user) {
            res.status(401).json({
                status: 401,
                message: 'Unauthorized, you need being authenticated to process the request.'
            });

            return;
        }
    };
}
