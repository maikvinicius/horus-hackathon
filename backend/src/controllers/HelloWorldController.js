class HelloWorldController {

    async getHelloWorld(req, res) {
        return res.json({
            success: true,
            message: "Hello world!"
        });
    }

}

module.exports = new HelloWorldController();