This tool is a web application that I wrote in Typescript using React.js *(just like this website btw)*, and I made the server using Express.js. The backend utilizes boto3 to fetch the required information from AWS directly.

I made this tool as a replacement for the atrocious pricing calculator for Amazon S3 that AWS provides; I made it as easy to use as possible while allowing users to do more advanced stuff with it than with AWS' calculator.

![image](https://raw.githubusercontent.com/ValentinRapp/portfolio/media/s3main.png)
![image](https://raw.githubusercontent.com/ValentinRapp/portfolio/media/s3graph.png)

## Features

1. Getting pricing information for every AWS region
2. Forecasting pricing to multiple months/years in advance
3. Having the choice to preview prices cumulatively or not depending on your specific needs
4. Ability to forecast prices for any S3 Storage class and Request type simultaneously
5. Handy ``Show total`` checkbox that allows you to preview the total price for each forecasted month
6. Fancy graph showing everything you need in a nice and dynamic way
7. Everything is simulated dynamically in realtime, no need to press a ``compute`` button or something like that
8. ``Export to CSV`` button if you want to do more advanced calculations on your own, or if you want to save the results you got