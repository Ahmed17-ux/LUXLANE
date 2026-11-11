<?php

namespace App\Http\Controllers;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{


    public function index()
    {
        $allreports = Report::all();
        return response()->json($allreports);
    }
    public function upadatestatus(Request $request){
        $validatedData = $request->validate([
            'reports' => 'array',
            'reports.*.id' => 'integer|exists:reports,id',
            'reports.*.status' => 'string|in:pending,completed,in progress',
        ]);

        foreach ($validatedData['reports'] as $reportData) {
            $report = Report::find($reportData['id']);
            $report->status = $reportData['status'];
            $report->save();
        }

        return response()->json(['message' => 'Reports status updated successfully']);
    }


    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'email' => 'required|email',
            'subject' => 'required|string',
            'content' => 'required|string',
        ]);

        $user = Auth::user();

        if ($validatedData['email'] !== $user->email) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $existingReport = Report::where('email', $user->email)
            ->where('subject', $validatedData['subject'])
            ->where('content', $validatedData['content'])
            ->first();

        if ($existingReport) {
            return response()->json(['error' => 'Duplicate report'], 409);
        }

        $report = new Report();
        $report->email = $validatedData['email'];
        $report->subject = $validatedData['subject'];
        $report->content = $validatedData['content'];

        $report->save();

        return response()->json(['message' => 'Report created successfully'], 201);
    }
}
