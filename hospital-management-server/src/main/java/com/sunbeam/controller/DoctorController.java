package com.sunbeam.controller;

import java.util.List;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dtos.DoctorDataBackinBean;
import com.sunbeam.dtos.DoctorVisitsDataBackinBean;
import com.sunbeam.dtos.Response;
import com.sunbeam.dtos.PatientDataBacking;
import com.sunbeam.services.DoctorServices;
import com.sunbeam.services.DoctorVisitsServices;
import com.sunbeam.services.EmailSenderService;
import com.sunbeam.services.PatientServices;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/doctor")
public class DoctorController  {
	@Autowired
	DoctorServices  doctorServices;
	@Autowired
	DoctorVisitsServices visitService;
	@Autowired
	PatientServices patientService;
	
	@Autowired
	private EmailSenderService emailSenderService;
	
	
	@GetMapping("/getAllDoctors")
	@RolesAllowed({"ROLE_DOCTOR","ROLE_RECEPTION"})
	public ResponseEntity<?> getAllPatients(){
		List<DoctorDataBackinBean> doctors=doctorServices.getAllDoctors();
		
		return Response.success(doctors);
	}
	@RolesAllowed({"ROLE_DOCTOR"})
	@PatchMapping("/addPrescription")
	public void updatePatient(@RequestBody PatientDataBacking patientData) {
		
		doctorServices.updatePatientDetails(patientData);
		
		
		
		
		patientData= patientService.getPatientById(patientData.getPatId());
		
		System.out.println("hi");
		emailSenderService.sendEmail(patientData.getEmail(), "Presciption Specified", "Dear "+patientData.getFirstName()+" "+patientData.getLastName()+" "+"You Have Been Given Presciption kindly Check, Take Care");
		
		
		
	}
	@RolesAllowed({"ROLE_DOCTOR"})
	@PostMapping("/increaseVisitCount")
	public ResponseEntity<?> increaseVisitCount(@RequestBody DoctorVisitsDataBackinBean visitData) {
		visitService.increaseVisitCount(visitData);
		
		return Response.success("increamented");
	}
	@RolesAllowed({"ROLE_DOCTOR"})
	@GetMapping("/getPatients/{id}")
	public ResponseEntity<?> getPatientsOfDoctor(@PathVariable int id){
		List<PatientDataBacking> patientList=patientService.getPatientsOfDocter(id);
		return Response.success(patientList);
	}
	
	
	
}
