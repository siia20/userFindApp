//instagram api keys setttings

ServiceConfiguration.configurations.remove({
    service: "instagram"
  });
  ServiceConfiguration.configurations.insert({
    service: "instagram",
    clientId: "ca4e03990f384056b6dea2d2b0dd90a4",
    scope:'basic+public_content',
    secret: "7d71ecb350e041c08afda3a79c95e4e9"
  });