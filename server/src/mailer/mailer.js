module.exports = function(Q, nodemailer, emailTemplates, mailerConfig, templatesDirectory) {

  return {
    send: function(templateName, subject, params, email) {
      var deferred = Q.defer();
      emailTemplates(templatesDirectory, function(err, template) {
        if (err) {
          deferred.reject(err);
        }
        // Prepare nodemailer transport object
        var transport = nodemailer.createTransport(mailerConfig.transport);

        // Send a single email
        template(templateName, params, function(err, html) {
          if (err) {
            deferred.reject(err);
          } else {
            transport.sendMail({
              from: mailerConfig.from,
              to: email,
              subject: subject,
              html: html,
              generateTextFromHTML: true
            }, function(err, responseStatus) {
              if (err) {
                deferred.reject(err);
              } else {
                deferred.resolve(responseStatus);
              }
            });
          }
        });
      });

      return deferred.promise;
    },

    sendAdminMail: function(template, subject, params) {
      return this.send(template, subject, params, mailerConfig.to);
    }
  };
};
