# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
-keep class com.google.android.filament.** { *; }
-keep interface com.google.android.filament.** { *; }
-keep class com.vuforia.** { *; }
-keep interface com.vuforia.** { *; }
-keep class com.google.ar.core.** { *; }
-keep interface com.google.ar.core.** { *; }
-keep class ca.iversoft.iar_core.** { *; }
-keep interface ca.iversoft.iar_core.** { *; }
-keep class com.iar.** { *; }
-keep interface com.iar.** { *; }