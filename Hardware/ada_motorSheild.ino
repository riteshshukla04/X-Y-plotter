
#ifdef ADAFRUIT_MOTORSHIELD_V1
const int stepType = INTERLEAVE;
AF_Stepper afMotorA(motorStepsPerRev, 1);
AF_Stepper afMotorB(motorStepsPerRev, 2);

void forwarda() { afMotorA.onestep(FORWARD, stepType); }
void backwarda() { afMotorA.onestep(BACKWARD, stepType); }
void forwardb() { afMotorB.onestep(FORWARD, stepType); }
void backwardb() { afMotorB.onestep(BACKWARD, stepType); }

AccelStepper motorA(forwarda, backwarda);
AccelStepper motorB(forwardb, backwardb);
#endif

#ifdef ADAFRUIT_MOTORSHIELD_V2
const int stepType = MICROSTEP;

Adafruit_MotorShield AFMS = Adafruit_MotorShield(); 
Adafruit_StepperMotor *afMotorA = AFMS.getStepper(motorStepsPerRev, 1);
Adafruit_StepperMotor *afMotorB = AFMS.getStepper(motorStepsPerRev, 2);

void forwarda() { afMotorA->onestep(FORWARD, stepType); }
void backwarda() { afMotorA->onestep(BACKWARD, stepType); }
void forwardb() { afMotorB->onestep(FORWARD, stepType); }
void backwardb() { afMotorB->onestep(BACKWARD, stepType); }
AccelStepper motorA(forwarda, backwarda);
AccelStepper motorB(forwardb, backwardb);
#endif

#ifdef SERIAL_STEPPER_DRIVERS
#define MOTOR_A_ENABLE_PIN 3
#define MOTOR_A_STEP_PIN 4
#define MOTOR_A_DIR_PIN 5
  
#define MOTOR_B_ENABLE_PIN 6
#define MOTOR_B_STEP_PIN 7
#define MOTOR_B_DIR_PIN 8
AccelStepper motorA(1,MOTOR_A_STEP_PIN, MOTOR_A_DIR_PIN); 
AccelStepper motorB(1,MOTOR_B_STEP_PIN, MOTOR_B_DIR_PIN); 
#endif

#ifdef UNL2003_DRIVER

AccelStepper motorA(8, 6,8,7,9);
AccelStepper motorB(8, 2,4,3,5);
#endif

void configuration_motorSetup()
{
#ifdef SERIAL_STEPPER_DRIVERS
  pinMode(MOTOR_A_ENABLE_PIN, OUTPUT);
  digitalWrite(MOTOR_A_ENABLE_PIN, HIGH);
  pinMode(MOTOR_B_ENABLE_PIN, OUTPUT);
  digitalWrite(MOTOR_B_ENABLE_PIN, HIGH);
  motorA.setEnablePin(MOTOR_A_ENABLE_PIN);
  motorA.setPinsInverted(false, false, true);
  motorB.setEnablePin(MOTOR_B_ENABLE_PIN);
  motorB.setPinsInverted(true, false, true); // this one turns the opposite direction to A, hence inverted.
#endif
}

void configuration_setup()
{
  mmPerStep = mmPerRev / multiplier(motorStepsPerRev);
  stepsPerMM = multiplier(motorStepsPerRev) / mmPerRev;
  
#ifdef ADAFRUIT_MOTORSHIELD_V2
  AFMS.begin();  // create with the default frequency 1.6KHz
#endif
  delay(500);
  
}