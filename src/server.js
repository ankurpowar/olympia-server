import Fastify from "fastify";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import cors from '@fastify/cors'

import { createRequire } from 'module';

import { fileURLToPath } from 'url';
import { dirname } from 'path';






const require = createRequire(import.meta.url);
const path = require('node:path')
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nodemailer = require('nodemailer');
const fs = require('node:fs')
const { pipeline } = require('node:stream/promises')

const start = async () => {
    const fastify = Fastify({
        trustProxy: true,

    })


    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/olympia-test');


        // let districtsList = await adminModel.distinct('district');
        // fastify.districtsList.push(...districtsList)


    } catch (error) {
        console.log(error);
    }

    try {



        fastify.register(cors, { origin: '*' });
        fastify.register(require('@fastify/multipart'), {
            attachFieldsToBody: 'keyValues', limits: {
                fileSize: 5000000
            }
        })

        fastify.post('/api/career-applications', async function (req, reply) {

            let { firstName, lastName, phoneNumber, email, education, experience, jobTitle, jobFor, filename, dateOfBirth } = req.body

            
            const savePath = path.join(__dirname, 'uploads', filename);
            await fs.writeFileSync(savePath, req.body.resume);

            const transporter = nodemailer.createTransport({
                host: 'smtp.zoho.com',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'ankurpowar94@zoho.com', // generated ethereal user
                    pass: 'Zoho@123!@#', // generated ethereal password
                },
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false,
                },
            });

            let info = await transporter.sendMail({
                user: 'ankurpowar94@zoho.com', // generated ethereal user
                from: 'ankurpowar94@zoho.com', // sender address
                to: 'ankur_powar@yahoo.co.in', // list of receivers
                subject: 'Careers Application - website', // Subject line
                //text: "Your Credit Card details might be vulerable...call 911", // plain text body

                attachments: [
                    {
                        filename: filename,
                        content: req.body.resume
                    }

                ],

                html:
                    `<style>
                    .main-content{
                      margin-left:20%,
                      width:60%
                    }
                    @media screen and (max-width: 500px){
                      .main-content{
                        margin-left:5%,
                        width:90%
                      }
                    }
                  </style>
                    <div class="main-content" style="margin-left:5%; width:90%">
                        <h3>A User Submitted Careers form with following Details</h3>
                    </div>
                    <div class="main-content" style="margin-left:5%; width:90%">
                    <p style="padding: 0.5rem 0; margin: 0;"><strong>Job Title: </strong>${jobTitle}</p>
                    <p style="padding: 0.5rem 0; margin: 0;"><strong>Experience requirement: </strong>${jobFor}</p>
                        <p style="padding: 0.5rem 0; margin: 0;"><strong>First Name: </strong>${firstName}</p>
                        <p style="padding: 0.5rem 0; margin: 0;"><strong>Last Name: </strong>${lastName}</p>
                        <p style="padding: 0.5rem 0; margin: 0;"><strong>Phone Number: </strong>${phoneNumber}</p>
                        <p style="padding: 0.5rem 0; margin: 0;"><strong>Email: </strong>${email}</p>
                        <p style="padding: 0.5rem 0; margin: 0;"><strong>Date Of Birth: </strong>${dateOfBirth}</p>
                        <p style="padding: 0.5rem 0; margin: 0;"><strong>Education: </strong>${education}</p>
                        <p style="padding: 0.5rem 0; margin: 0;"><strong>Experience: </strong>${experience}</p>
                        
                    </div>
                    <div style="margin-left: 20%; width: 60%;">
                        <p style="display: inline-block ;font-size: 0.8rem; margin-top: 5rem; padding: 0.5rem; background-color: rgb(255, 255, 111);">Do not reply to this Email. This is auto-generated mail.</p>
                    </div>` // html body
            });


            reply.send()
        })

        // fastify.register(routes, {prefix: '/api'})
        await fastify.listen({ port: 3200, host: '0.0.0.0' })
        console.log(`listening on port:3200.`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

start();