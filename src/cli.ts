#!/usr/bin/env node

import { startProgram } from "./program.js";
import {programDescription, programName} from "./data.js";

startProgram(programName, programDescription);
