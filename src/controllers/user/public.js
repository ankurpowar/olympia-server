import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { generateRandomString } from '../../utils/globals.js';
import applicationModel from '../../mongoose-models/applications.js';
import contactUsModel from '../../mongoose-models/contact-us.js';

const require = createRequire(import.meta.url);
const path = require('node:path')
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nodemailer = require('nodemailer');
const fs = require('node:fs')

async function handleCareerApplication(request, reply){
    let { firstName, lastName, phoneNumber, email, education, experience, jobTitle, requiredExperience, filename, dateOfBirth } = request.body

            const lastDotIndex = filename.lastIndexOf('.');  
            const fileExtension = filename.substring(lastDotIndex );

            const newFileName = generateRandomString() + fileExtension

            await applicationModel.create({
                firstName, lastName, phoneNumber, email, education, experience, jobTitle, requiredExperience, dateOfBirth,
                resume: newFileName
            })
            const savePath = path.join(process.cwd(), '/src/uploads', newFileName);
            await fs.writeFileSync(savePath, request.body.resume);

            const transporter = nodemailer.createTransport({
                host: 'smtpout.secureserver.net',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'hr@olympianationalschool.com', // generated ethereal user
                    pass: 'Olympia@0024', // generated ethereal password
                },
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false,
                },
            });
            
            try {
                let info = await transporter.sendMail({
                    user: 'hr@olympianationalschool.com', // generated ethereal user
                    from: 'hr@olympianationalschool.com', // sender address
                    to: 'hr@olympianationalschool.com', // list of receivers
                    subject: 'Careers Application - website', // Subject line
                    //text: "Your Credit Card details might be vulerable...call 911", // plain text body
    
                    attachments: [
                        {
                            filename: filename,
                            content: request.body.resume
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
                        <p style="padding: 0.5rem 0; margin: 0;"><strong>Experience requirement: </strong>${requiredExperience}</p>
                            <p style="padding: 0.5rem 0; margin: 0;"><strong>First Name: </strong>${firstName}</p>
                            <p style="padding: 0.5rem 0; margin: 0;"><strong>Last Name: </strong>${lastName}</p>
                            <p style="padding: 0.5rem 0; margin: 0;"><strong>Phone Number: </strong>${phoneNumber}</p>
                            <p style="padding: 0.5rem 0; margin: 0;"><strong>Email: </strong>${email}</p>
                            <p style="padding: 0.5rem 0; margin: 0;"><strong>Date Of Birth: </strong>${new Date(dateOfBirth).toDateString()}</p>
                            <p style="padding: 0.5rem 0; margin: 0;"><strong>Education: </strong>${education}</p>
                            <p style="padding: 0.5rem 0; margin: 0;"><strong>Experience: </strong>${experience}</p>
                            
                        </div>
                        <div style="margin-left: 20%; width: 60%;">
                            <p style="display: inline-block ;font-size: 0.8rem; margin-top: 5rem; padding: 0.5rem; background-color: rgb(255, 255, 111);">Do not reply to this Email. This is auto-generated mail.</p>
                        </div>` // html body
                });
            }catch(error){
                return reply.status(500).send({message:error})
            }
            
            


            return reply.send()
}

async function handleContactUs(request, reply){
    let { firstName, lastName, phoneNumber, email, message } = request.body

            await contactUsModel.create({firstName, lastName, phoneNumber, email, message})

            const transporter = nodemailer.createTransport({
                host: 'smtpout.secureserver.net',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'hr@olympianationalschool.com', // generated ethereal user
                    pass: 'Olympia@0024', // generated ethereal password
                },
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false,
                },
            });
            
            try {
                let info = await transporter.sendMail({
                    user: 'hr@olympianationalschool.com', // generated ethereal user
                    from: 'hr@olympianationalschool.com', // sender address
                    to: 'hr@olympianationalschool.com', // list of receivers
                    subject: 'Contact Us - website', // Subject line
                    //text: "Your Credit Card details might be vulerable...call 911", // plain text body
    
                    
    
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
                        
                        
                            <p style="padding: 0.5rem 0; margin: 0;"><strong>First Name: </strong>${firstName}</p>
                            <p style="padding: 0.5rem 0; margin: 0;"><strong>Last Name: </strong>${lastName}</p>
                            <p style="padding: 0.5rem 0; margin: 0;"><strong>Phone Number: </strong>${phoneNumber}</p>
                            <p style="padding: 0.5rem 0; margin: 0;"><strong>Email: </strong>${email}</p>
                            <p style="padding: 0.5rem 0; margin: 0;"><strong>Message: </strong>${message}</p>
                            
                            
                        </div>
                        <div style="margin-left: 20%; width: 60%;">
                            <p style="display: inline-block ;font-size: 0.8rem; margin-top: 5rem; padding: 0.5rem; background-color: rgb(255, 255, 111);">Do not reply to this Email. This is auto-generated mail.</p>
                        </div>` // html body
                });
            } catch (error) {
                return reply.code(500).send({message: error})
            } 
            


            return reply.send()
}

async function testServer(request,reply){
    return reply.code(200).send({message:'success'})
}

export {testServer, handleCareerApplication, handleContactUs}